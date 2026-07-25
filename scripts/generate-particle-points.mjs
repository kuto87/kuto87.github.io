import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { inflateSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const inputPath = resolve(root, 'public/particle-87.png')
const outputPath = resolve(root, 'public/particle-87-points.bin')
const pattern = [
  [3, 5, 1.25], [15, 3, 0.8], [29, 8, 1.05], [39, 4, 0.7],
  [8, 18, 0.75], [21, 15, 1.35], [35, 20, 0.95], [3, 31, 0.7],
  [13, 36, 1.1], [27, 29, 0.65], [41, 34, 1.2], [6, 44, 1],
  [22, 45, 0.7], [34, 42, 0.85],
]

function hash(value) {
  const result = Math.sin(value * 12.9898) * 43758.5453
  return result - Math.floor(result)
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft
  const leftDistance = Math.abs(estimate - left)
  const aboveDistance = Math.abs(estimate - above)
  const upperLeftDistance = Math.abs(estimate - upperLeft)

  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left
  if (aboveDistance <= upperLeftDistance) return above
  return upperLeft
}

function decodeRgbaPng(source) {
  const signature = source.subarray(0, 8).toString('hex')
  if (signature !== '89504e470d0a1a0a') throw new Error('Invalid PNG signature')

  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  let interlace = 0
  let offset = 8
  const imageChunks = []

  while (offset < source.length) {
    const length = source.readUInt32BE(offset)
    const type = source.subarray(offset + 4, offset + 8).toString('ascii')
    const data = source.subarray(offset + 8, offset + 8 + length)
    offset += length + 12

    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      interlace = data[12]
    } else if (type === 'IDAT') {
      imageChunks.push(data)
    } else if (type === 'IEND') {
      break
    }
  }

  if (bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
    throw new Error('Expected a non-interlaced 8-bit RGBA PNG')
  }
  if (width !== 1200 || height !== 800 || imageChunks.length === 0) {
    throw new Error('Unexpected particle source dimensions or missing image data')
  }

  const bytesPerPixel = 4
  const stride = width * bytesPerPixel
  const inflated = inflateSync(Buffer.concat(imageChunks))
  if (inflated.length !== height * (stride + 1)) {
    throw new Error('Unexpected decompressed PNG size')
  }
  const pixels = Buffer.alloc(stride * height)
  let sourceOffset = 0

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset]
    sourceOffset += 1
    const rowOffset = y * stride
    const previousRowOffset = (y - 1) * stride

    for (let x = 0; x < stride; x += 1) {
      const raw = inflated[sourceOffset + x]
      const left = x >= bytesPerPixel ? pixels[rowOffset + x - bytesPerPixel] : 0
      const above = y > 0 ? pixels[previousRowOffset + x] : 0
      const upperLeft = y > 0 && x >= bytesPerPixel
        ? pixels[previousRowOffset + x - bytesPerPixel]
        : 0

      let value = raw
      if (filter === 1) value += left
      else if (filter === 2) value += above
      else if (filter === 3) value += Math.floor((left + above) / 2)
      else if (filter === 4) value += paeth(left, above, upperLeft)
      else if (filter !== 0) throw new Error(`Unsupported PNG filter: ${filter}`)

      pixels[rowOffset + x] = value & 0xff
    }
    sourceOffset += stride
  }

  return { width, height, pixels }
}

const { width, height, pixels } = decodeRgbaPng(readFileSync(inputPath))
const points = []

for (let tileY = 0; tileY < height; tileY += 47) {
  for (let tileX = 0; tileX < width; tileX += 43) {
    for (const [offsetX, offsetY, radius] of pattern) {
      const x = tileX + offsetX
      const y = tileY + offsetY
      if (x >= width || y >= height) continue
      if (pixels[(y * width + x) * 4 + 3] > 24) points.push([x / width, y / height, radius])
    }
  }
}

const values = new Float32Array(points.length * 6)

if (points.length < 1000 || points.length > 5000) {
  throw new Error(`Unexpected particle count: ${points.length}`)
}

points.forEach(([x, y, radius], index) => {
  const seed = hash(index + 1)
  const radialX = (x - 0.5) * 1.08
  const radialY = y - 0.5
  const radialLength = Math.hypot(radialX, radialY) || 1
  const tangentSign = hash(index + 29) > 0.5 ? 1 : -1
  const tangentX = (-radialY / radialLength) * tangentSign
  const tangentY = (radialX / radialLength) * tangentSign
  const randomAngle = hash(index + 71) * Math.PI * 2
  const directionX = tangentX * 0.76 + Math.cos(randomAngle) * 0.24
  const directionY = tangentY * 0.76 + Math.sin(randomAngle) * 0.24
  const directionLength = Math.hypot(directionX, directionY) || 1
  const valueOffset = index * 6

  values[valueOffset] = x
  values[valueOffset + 1] = y
  values[valueOffset + 2] = directionX / directionLength
  values[valueOffset + 3] = directionY / directionLength
  values[valueOffset + 4] = radius
  values[valueOffset + 5] = seed
})

writeFileSync(outputPath, Buffer.from(values.buffer))
console.log(`Generated ${points.length} points (${values.byteLength} bytes)`)
