import { useEffect, useRef } from 'react'

const STAGE_PADDING = 16
const SCATTER_RESPONSE_SECONDS = 0.58
const DESKTOP_IDLE_FPS = 18
const COARSE_POINTER_IDLE_FPS = 10
const DESKTOP_ROAM_FPS = 24
const COARSE_POINTER_ROAM_FPS = 16
const MOBILE_BOX_WIDTH_RATIO = 1.18
const MOBILE_POINT_CLOUD_RIGHT_EDGE = 0.885

const VERTEX_SHADER = `
  precision highp float;

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
  uniform float uTime;
  uniform float uIdleDrift;
  uniform float uDrift;

  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vec2 base = uBox.xy + aPosition * uBox.zw;
    vec2 center = uBox.xy + uBox.zw * 0.5;
    float start = 0.05 + aSeed * 0.18;
    float finish = 0.80 + aSeed * 0.16;
    float scatter = smoothstep(start, finish, uProgress);
    float colorNoise = fract(aSeed * 53.17 + 0.137);
    float redMask = 1.0 - step(0.10, colorNoise);
    float blueMask = step(0.10, colorNoise) * (1.0 - step(0.20, colorNoise));
    float greenMask = step(0.20, colorNoise) * (1.0 - step(0.29, colorNoise));
    float ochreMask = step(0.29, colorNoise) * (1.0 - step(0.38, colorNoise));
    float isColored = redMask + blueMask + greenMask + ochreMask;
    float colorStrength = mix(0.98, 1.0, scatter);
    float colorOpacityBoost = mix(1.46, 1.62, scatter);
    vec3 ink = vec3(0.106, 0.102, 0.090);
    vColor = ink;
    vColor = mix(vColor, vec3(0.820, 0.294, 0.212), redMask * colorStrength);
    vColor = mix(vColor, vec3(0.141, 0.361, 0.502), blueMask * colorStrength);
    vColor = mix(vColor, vec3(0.224, 0.439, 0.353), greenMask * colorStrength);
    vColor = mix(vColor, vec3(0.761, 0.529, 0.141), ochreMask * colorStrength);
    float distanceVariation = mix(0.84, 1.18, fract(aSeed * 7.31));
    vec2 radial = (base - center) * uExpansion * distanceVariation * scatter;
    vec2 tangent = aDirection * uTangent * mix(0.35, 1.0, aSeed) * scatter * scatter;
    float phase = aSeed * 43.982;
    float spin = step(0.5, fract(aSeed * 17.23)) * 2.0 - 1.0;
    vec2 driftNormal = vec2(-aDirection.y, aDirection.x);

    float idleSpeed = mix(0.62, 0.98, fract(aSeed * 9.17));
    float idleAngle = phase + uTime * idleSpeed * spin;
    vec2 idleMotion = aDirection * cos(idleAngle) + driftNormal * sin(idleAngle) * 0.68;
    idleMotion *= uIdleDrift * mix(0.72, 1.0, fract(aSeed * 13.71));

    float roamSpeed = mix(0.38, 0.68, fract(aSeed * 5.43));
    float roamAngle = phase * 1.37 + uTime * roamSpeed * spin;
    float secondaryAngle = phase * 2.11 - uTime * roamSpeed * 0.53 * spin;
    vec2 roamMotion = aDirection * cos(roamAngle) + driftNormal * sin(roamAngle) * 0.74;
    roamMotion += (
      aDirection * sin(secondaryAngle)
      + driftNormal * cos(secondaryAngle) * 0.62
    ) * 0.38;
    roamMotion *= uDrift * mix(0.68, 1.0, fract(aSeed * 19.31));

    float roamMix = smoothstep(0.48, 0.94, scatter);
    vec2 particleMotion = mix(idleMotion, roamMotion, roamMix);
    vec2 position = base + radial + tangent + particleMotion;
    vec2 clip = position / uResolution * 2.0 - 1.0;

    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    gl_PointSize = max(2.1 * uDpr, aRadius * 2.0 * (uBox.z / 1200.0) * uDpr);

    float textColumnFade = mix(0.55, 1.0, smoothstep(0.30, 0.58, position.x / uResolution.x));
    float particleOpacity = uOpacity * mix(1.0, 0.72 * textColumnFade, scatter);
    vOpacity = particleOpacity * mix(1.0, colorOpacityBoost, isColored);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;

  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float edge = 1.0 - smoothstep(0.40, 0.5, distanceFromCenter);
    float alpha = vOpacity * edge;

    if (edge <= 0.0) discard;
    gl_FragColor = vec4(vColor * alpha, alpha);
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
  time: WebGLUniformLocation
  idleDrift: WebGLUniformLocation
  drift: WebGLUniformLocation
}

type RenderLayout = {
  width: number
  height: number
  boxLeft: number
  boxTop: number
  boxWidth: number
  boxHeight: number
  expansion: number
  tangent: number
  opacity: number
  dpr: number
  idleDrift: number
  drift: number
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
    time: requireUniform(gl, program, 'uTime'),
    idleDrift: requireUniform(gl, program, 'uIdleDrift'),
    drift: requireUniform(gl, program, 'uDrift'),
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
    let animationTimer = 0
    let resizeFrame = 0
    let gl: WebGLRenderingContext | null = null
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let locations: ShaderLocations | null = null
    let pointCloud: PointCloud | null = null
    let renderLayout: RenderLayout | null = null
    let currentProgress = 0
    let targetProgress = 0
    let driftTime = 0
    let lastFrameTimestamp = 0
    let contextLost = false
    let initializing = false
    const pointRequest = new AbortController()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')
    const forcedColors = window.matchMedia('(forced-colors: active)')

    const isMobile = () => window.innerWidth <= 620

    const getDpr = () => {
      const preferredDpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.5)
      const cssPixels = Math.max(1, canvas.clientWidth * canvas.clientHeight)
      const areaLimitedDpr = Math.sqrt(6_000_000 / cssPixels)
      return Math.min(preferredDpr, areaLimitedDpr)
    }

    const getTargetProgress = () => {
      const start = window.innerHeight * 0.04
      const distance = Math.max(window.innerHeight * (isMobile() ? 1.05 : 1.25), 560)
      return clamp((window.scrollY - start) / distance, 0, 1)
    }

    const canAnimate = () => Boolean(
      gl
      && program
      && buffer
      && locations
      && pointCloud
      && !contextLost
      && !forcedColors.matches
    )

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (animationTimer) window.clearTimeout(animationTimer)
      animationFrame = 0
      animationTimer = 0
      lastFrameTimestamp = 0
    }

    const updateRenderLayout = () => {
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
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const mobile = isMobile()
      const boxWidth = mobile
        ? viewportWidth * MOBILE_BOX_WIDTH_RATIO
        : clamp(viewportWidth * 0.58, 720, 1120)
      const boxHeight = mobile
        ? boxWidth * (2 / 3)
        : Math.min(boxWidth * 0.99, viewportHeight * 1.04)
      const boxLeft = mobile
        ? viewportWidth - boxWidth * MOBILE_POINT_CLOUD_RIGHT_EDGE
        : STAGE_PADDING + viewportWidth - boxWidth
      const mobileBoxTop = viewportWidth <= 360 ? 236 : 214
      const boxCenterY = mobile
        ? STAGE_PADDING + mobileBoxTop + boxHeight / 2
        : STAGE_PADDING + viewportHeight * 0.525

      renderLayout = {
        width: cssWidth,
        height: cssHeight,
        boxLeft,
        boxTop: boxCenterY - boxHeight / 2,
        boxWidth,
        boxHeight,
        expansion: mobile ? 1.15 : 2.25,
        tangent: mobile ? 10 : 18,
        opacity: mobile ? 0.36 : (viewportWidth <= 900 ? 0.42 : 0.52),
        dpr,
        idleDrift: mobile ? 2.5 : 3.4,
        drift: mobile ? 26 : 40,
      }
    }

    const draw = () => {
      if (!gl || !program || !buffer || !locations || !pointCloud || contextLost) return

      if (!renderLayout) updateRenderLayout()
      if (!renderLayout) return

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.uniform2f(locations.resolution, renderLayout.width, renderLayout.height)
      gl.uniform4f(
        locations.box,
        renderLayout.boxLeft,
        renderLayout.boxTop,
        renderLayout.boxWidth,
        renderLayout.boxHeight,
      )
      gl.uniform1f(locations.progress, currentProgress)
      gl.uniform1f(locations.expansion, renderLayout.expansion)
      gl.uniform1f(locations.tangent, renderLayout.tangent)
      gl.uniform1f(locations.opacity, renderLayout.opacity)
      gl.uniform1f(locations.dpr, renderLayout.dpr)
      gl.uniform1f(locations.time, driftTime)
      gl.uniform1f(locations.idleDrift, renderLayout.idleDrift)
      gl.uniform1f(locations.drift, renderLayout.drift)
      gl.drawArrays(gl.POINTS, 0, pointCloud.count)
    }

    const animate = (timestamp: number) => {
      animationFrame = 0
      if (disposed || document.hidden || reducedMotion.matches || !canAnimate()) {
        stopAnimation()
        return
      }

      const elapsedSeconds = lastFrameTimestamp
        ? Math.min((timestamp - lastFrameTimestamp) / 1000, 0.125)
        : 0
      lastFrameTimestamp = timestamp

      const difference = targetProgress - currentProgress
      const response = 1 - Math.exp(-elapsedSeconds / SCATTER_RESPONSE_SECONDS)
      currentProgress += difference * response
      if (Math.abs(difference) < 0.0005) currentProgress = targetProgress
      driftTime += elapsedSeconds
      draw()

      if (currentProgress !== targetProgress) {
        startAnimation(true)
      } else {
        startAnimation(false)
      }
    }

    const startAnimation = (immediate = true) => {
      if (disposed || document.hidden || reducedMotion.matches || !canAnimate()) return

      if (immediate && animationTimer) {
        window.clearTimeout(animationTimer)
        animationTimer = 0
      }
      if (animationFrame || animationTimer) return

      if (immediate) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        const roaming = currentProgress >= 0.62
        const frameRate = coarsePointer.matches
          ? (roaming ? COARSE_POINTER_ROAM_FPS : COARSE_POINTER_IDLE_FPS)
          : (roaming ? DESKTOP_ROAM_FPS : DESKTOP_IDLE_FPS)
        animationTimer = window.setTimeout(() => {
          animationTimer = 0
          if (
            !disposed
            && !document.hidden
            && !reducedMotion.matches
            && !forcedColors.matches
          ) {
            animationFrame = requestAnimationFrame(animate)
          }
        }, 1000 / frameRate)
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
        renderLayout = null
        targetProgress = getTargetProgress()
        if (reducedMotion.matches || forcedColors.matches) return
        draw()
        startAnimation(true)
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

    const onAnimationPreferenceChange = () => {
      if (reducedMotion.matches || forcedColors.matches) {
        stopAnimation()
        stage.classList.remove('is-ready')
      } else if (gl && program && buffer && locations && !contextLost) {
        currentProgress = getTargetProgress()
        targetProgress = currentProgress
        renderLayout = null
        draw()
        stage.classList.add('is-ready')
        startAnimation(true)
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

      renderLayout = null
      program = createProgram(gl)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.disable(gl.DEPTH_TEST)
      bindBuffer()
      currentProgress = getTargetProgress()
      targetProgress = currentProgress
      draw()

      if (!reducedMotion.matches && !forcedColors.matches) {
        stage.classList.add('is-ready')
        startAnimation(true)
      }
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
      renderLayout = null

      if (reducedMotion.matches || forcedColors.matches) {
        gl = null
        stage.classList.remove('is-ready')
        return
      }

      try {
        setupWebGL()
      } catch {
        stage?.classList.remove('is-ready')
      }
    }

    async function initialize() {
      if (disposed || reducedMotion.matches || forcedColors.matches || initializing || gl) return
      initializing = true

      try {
        if (!pointCloud) pointCloud = await loadPointCloud(pointRequest.signal)
        if (disposed || reducedMotion.matches || forcedColors.matches) return
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
    reducedMotion.addEventListener('change', onAnimationPreferenceChange)
    forcedColors.addEventListener('change', onAnimationPreferenceChange)
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
      reducedMotion.removeEventListener('change', onAnimationPreferenceChange)
      forcedColors.removeEventListener('change', onAnimationPreferenceChange)
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
