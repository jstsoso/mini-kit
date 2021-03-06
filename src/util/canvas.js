/*
  在 wxml 中需要提前声明
  <canvas canvas-id="canvas" style="width: 375px; height: 375px; background-color: red;"/>
*/
import { g } from '@util'

let CTX
export default function canvas(canvasId, config = []) {
  CTX = g.createCanvasContext(canvasId)

  config.forEach(item => {
    const type = item.type?.toLowerCase()
    switch (type) {
      case 'image':
        drawImage(item)
        break
      case 'text':
        drawText(item)
        break
      case 'background':
        drawBackground(item)
        break
    }
  })

  return new Promise((resolve, reject) => {
    CTX.draw(false, () => g.canvasToTempFilePath({ canvasId, quality: 1, success: resolve, fail: reject }))
  })
}

function drawImage(config) {
  // info 为 g.getImageInfo 的信息，即图片的真实宽高
  const { top, left, width, height, url, info } = config
  if (info) {
    // aspectFill 模式，水平100%，垂直居中截取
    CTX.save()
    CTX.beginPath()
    CTX.rect(left, top, width, height)
    CTX.clip()
    const newHeight = width / info.width * info.height
    const topOffset = newHeight > height ? (newHeight - height) / 2 : 0
    CTX.drawImage(url, left, top - topOffset, width, newHeight)
    CTX.restore()
  } else {
    CTX.drawImage(url, left, top, width, height)
  }
}

function drawText(config) {
  const { text, top, left, maxWidth, fontSize, color, textAlign = 'left', baseline = 'top' } = config
  CTX.setFontSize(fontSize)
  CTX.setTextAlign(textAlign)
  CTX.setFillStyle(color)
  CTX.setTextBaseline(baseline)

  const { width } = CTX.measureText(text)
  if (!maxWidth || width < maxWidth) return CTX.fillText(text, left, top)
  drawTextLine(config)
}

function drawTextLine(config) {
  const { text, top, left, maxWidth, lineHeight, maxLine = 1 } = config

  const lines = [''] // 每一行的文字
  let isOver = false // 文字是否多余

  for (const word of text) {
    const last = lines[lines.length - 1]
    const { width } = CTX.measureText(last)

    if (width < maxWidth) lines[lines.length - 1] = `${last}${word}`
    else {
      if (lines.length >= maxLine) {
        isOver = true
        break
      }
      lines.push(word)
    }
  }

  if (isOver) {
    const last = lines[lines.length - 1]
    lines[lines.length - 1] = `${last.substring(0, last.length - 1)}...`
  }

  for (let index = 0; index < lines.length; index++) {
    CTX.fillText(lines[index], left, top + (lineHeight * index), maxWidth)
  }
}

function drawBackground(config) {
  const { top, left, width, height, color } = config
  CTX.setFillStyle(color)
  CTX.setStrokeStyle(color)
  CTX.fillRect(left, top, width, height)
}
