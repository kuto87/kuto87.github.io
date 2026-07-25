import { useEffect, useRef } from 'react'

const STAGE_PADDING = 16

const VERTEX_SHADER = `
  precision mediump float;

  attribute vec2 aPosition;
  attribute vec2 aDirection;
  attribute float aRadius;
  attribute float aSeed;

  uniform vec2 uResolution;
  uniform vec4 uBox;
  uniform float uProgress;
  uniform float uExpansion;
  uniform float uTangent;
  uniform float uOpacity;
  uniform float uDpr;

  varying float vOpacity;

  void main() {
    vec2 base = uBox.xy + aPosition * uBox.zw;
    vec2 center = uBox.xy + uBox.zw * 0.5;
    float start = 0.02 + aSeed * 0.14;
    float finish = 0.72 + aSeed * 0.18;
    float scatter = smoothstep(start, finish, uProgress);
    float distanceVariation = mix(0.84, 1.18, fract(aSeed * 7.31));
    vec2 radial = (base - center) * uExpansion * distanceVariation * scatter;
    vec2 tangent = aDirection * uTangent * mix(0.35, 1.0, aSeed) * scatter * scatter;
    vec2 position = base + radial + tangent;
    vec2 clip = position / uResolution * 2.0 - 1.0;

    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    gl_PointSize = max(2.1 * uDpr, aRadius * 2.0 * (uBox.z / 1200.0) * uDpr);

    float textColumnFade = mix(0.55, 1.0, smoothstep(0.30, 0.58, position.x / uResolution.x));
    vOpacity = uOpacity * mix(1.0, 0.58 * textColumnFade, scatter);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;

  varying float vOpacity;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float edge = 1.0 - smoothstep(0.40, 0.5, distanceFromCenter);
    float alpha = vOpacity * edge;

    if (edge <= 0.0) discard;
    gl_FragColor = vec4(vec3(0.09, 0.09, 0.08) * alpha, alpha);
  }
`

type PointCloud = {
  count: number
  values: Float32Array
}

type ShaderLocations = {
  position: number
  direction: number
  radius: number
  seed: number
  resolution: WebGLUniformLocation
  box: WebGLUniformLocation
  progress: WebGLUniformLocation
  expansion: WebGLUniformLocation
  tangent: WebGLUniformLocation
  opacity: WebGLUniformLocation
  dpr: WebGLUniformLocation
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

async function loadPointCloud(signal: AbortSignal): Promise<PointCloud> {
  const response = await fetch('/particle-87-points.bin', { signal })
  if (!response.ok) throw new Error('Unable to load particle coordinates')

  const data = await response.arrayBuffer()
  const stride = 6 * Float32Array.BYTES_PER_ELEMENT
  if (data.byteLength === 0 || data.byteLength % stride !== 0) {
    throw new Error('Invalid particle coordinate data')
  }

  return {
    count: data.byteLength / stride,
    values: new Float32Array(data),
  }
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create WebGL shader')

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown shader error'
    gl.deleteShader(shader)
    throw new Error(message)
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()

  if (!program) throw new Error('Unable to create WebGL program')
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? 'Unknown program error'
    gl.deleteProgram(program)
    throw new Error(message)
  }

  return program
}

function requireAttribute(gl: WebGLRenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getAttribLocation(program, name)
  if (location < 0) throw new Error(`Missing WebGL attribute: ${name}`)
  return location
}

function requireUniform(gl: WebGLRenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getUniformLocation(program, name)
  if (location === null) throw new Error(`Missing WebGL uniform: ${name}`)
  return location
}

function getLocations(gl: WebGLRenderingContext, program: WebGLProgram): ShaderLocations {
  return {
    position: requireAttribute(gl, program, 'aPosition'),
    direction: requireAttribute(gl, program, 'aDirection'),
    radius: requireAttribute(gl, program, 'aRadius'),
    seed: requireAttribute(gl, program, 'aSeed'),
    resolution: requireUniform(gl, program, 'uResolution'),
    box: requireUniform(gl, program, 'uBox'),
    progress: requireUniform(gl, program, 'uProgress'),
    expansion: requireUniform(gl, program, 'uExpansion'),
    tangent: requireUniform(gl, program, 'uTangent'),
    opacity: requireUniform(gl, program, 'uOpacity'),
    dpr: requireUniform(gl, program, 'uDpr'),
  }
}

export function ParticleBackdrop() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    let disposed = false
    let animationFrame = 0
    let resizeFrame = 0
    let gl: WebGLRenderingContext | null = null
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let locations: ShaderLocations | null = null
    let pointCloud: PointCloud | null = null
    let currentProgress = 0
    let targetProgress = 0
    let contextLost = false
    let initializing = false
    const pointRequest = new AbortController()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const isMobile = () => window.innerWidth <= 620

    const getDpr = () => {
      const preferredDpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.5)
      const cssPixels = Math.max(1, canvas.clientWidth * canvas.clientHeight)
      const areaLimitedDpr = Math.sqrt(6_000_000 / cssPixels)
      return Math.min(preferredDpr, areaLimitedDpr)
    }

    const getTargetProgress = () => {
      const start = window.innerHeight * 0.04
      const distance = Math.max(window.innerHeight * (isMobile() ? 0.7 : 0.86), 460)
      return clamp((window.scrollY - start) / distance, 0, 1)
    }

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }

    const resize = () => {
      if (!gl) return
      const dpr = getDpr()
      const cssWidth = canvas.clientWidth
      const cssHeight = canvas.clientHeight
      const width = Math.max(1, Math.round(cssWidth * dpr))
      const height = Math.max(1, Math.round(cssHeight * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
    }

    const draw = () => {
      if (!gl || !program || !buffer || !locations || !pointCloud || contextLost) return

      resize()
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const mobile = isMobile()
      const boxWidth = mobile
        ? viewportWidth * 1.38
        : clamp(viewportWidth * 0.72, 760, 1120)
      const boxHeight = boxWidth * (2 / 3)
      const boxLeft = mobile
        ? STAGE_PADDING + viewportWidth * 1.54 - boxWidth
        : STAGE_PADDING + viewportWidth * 1.1 - boxWidth
      const boxCenterY = STAGE_PADDING + viewportHeight * (mobile ? 0.34 : 0.5)
      const dpr = getDpr()

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.uniform2f(locations.resolution, width, height)
      gl.uniform4f(locations.box, boxLeft, boxCenterY - boxHeight / 2, boxWidth, boxHeight)
      gl.uniform1f(locations.progress, currentProgress)
      gl.uniform1f(locations.expansion, mobile ? 1.15 : 2.25)
      gl.uniform1f(locations.tangent, mobile ? 10 : 18)
      gl.uniform1f(locations.opacity, mobile ? 0.24 : 0.3)
      gl.uniform1f(locations.dpr, dpr)
      gl.drawArrays(gl.POINTS, 0, pointCloud.count)
    }

    const animate = () => {
      animationFrame = 0
      if (disposed || document.hidden || reducedMotion.matches) return

      const difference = targetProgress - currentProgress
      currentProgress += difference * 0.16
      if (Math.abs(difference) < 0.001) currentProgress = targetProgress
      draw()

      if (currentProgress !== targetProgress) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const startAnimation = () => {
      if (!animationFrame && !document.hidden && !reducedMotion.matches) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const onScroll = () => {
      targetProgress = getTargetProgress()
      startAnimation()
    }

    const onResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0
        targetProgress = getTargetProgress()
        currentProgress = targetProgress
        draw()
      })
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation()
      } else {
        targetProgress = getTargetProgress()
        startAnimation()
      }
    }

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stopAnimation()
        stage.classList.remove('is-ready')
      } else if (gl && program && buffer && locations && !contextLost) {
        currentProgress = getTargetProgress()
        targetProgress = currentProgress
        draw()
        stage.classList.add('is-ready')
      } else {
        void initialize()
      }
    }

    const bindBuffer = () => {
      if (!gl || !program || !pointCloud) return
      buffer = gl.createBuffer()
      if (!buffer) throw new Error('Unable to create WebGL buffer')

      locations = getLocations(gl, program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.values, gl.STATIC_DRAW)

      const stride = 6 * Float32Array.BYTES_PER_ELEMENT
      gl.enableVertexAttribArray(locations.position)
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, stride, 0)
      gl.enableVertexAttribArray(locations.direction)
      gl.vertexAttribPointer(locations.direction, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT)
      gl.enableVertexAttribArray(locations.radius)
      gl.vertexAttribPointer(locations.radius, 1, gl.FLOAT, false, stride, 4 * Float32Array.BYTES_PER_ELEMENT)
      gl.enableVertexAttribArray(locations.seed)
      gl.vertexAttribPointer(locations.seed, 1, gl.FLOAT, false, stride, 5 * Float32Array.BYTES_PER_ELEMENT)
    }

    const setupWebGL = () => {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        powerPreference: 'low-power',
        premultipliedAlpha: true,
      })
      if (!gl) throw new Error('WebGL is unavailable')

      program = createProgram(gl)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.disable(gl.DEPTH_TEST)
      bindBuffer()
      currentProgress = getTargetProgress()
      targetProgress = currentProgress
      draw()

      if (!reducedMotion.matches) stage.classList.add('is-ready')
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      stopAnimation()
      stage.classList.remove('is-ready')
    }

    const onContextRestored = () => {
      if (disposed || !pointCloud) return
      contextLost = false
      program = null
      buffer = null
      locations = null

      try {
        setupWebGL()
      } catch {
        stage?.classList.remove('is-ready')
      }
    }

    async function initialize() {
      if (disposed || reducedMotion.matches || initializing || gl) return
      initializing = true

      try {
        pointCloud = await loadPointCloud(pointRequest.signal)
        if (disposed) return
        setupWebGL()
      } catch {
        stage?.classList.remove('is-ready')
      } finally {
        initializing = false
      }
    }

    const startupFrame = requestAnimationFrame(() => void initialize())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onMotionPreferenceChange)
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    return () => {
      disposed = true
      pointRequest.abort()
      cancelAnimationFrame(startupFrame)
      stopAnimation()
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      if (gl && buffer) gl.deleteBuffer(buffer)
      if (gl && program) gl.deleteProgram(program)
    }
  }, [])

  return (
    <div aria-hidden="true" className="particle-stage" ref={stageRef}>
      <div className="particle-fallback" />
      <canvas className="particle-canvas" ref={canvasRef} />
    </div>
  )
}
