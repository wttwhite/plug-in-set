/**
 * @description: 图片压缩
 */
export default function compressImg(
  file,
  scale = 0.5,
  encoderOptions = {
    '<1': 1,
    '1-2': 0.5,
    '>2': 0.2,
  }
) {
  let disposeFile = file
  if (Object.prototype.toString.call(file) === '[object Blob]') {
    debugger
    disposeFile = new File([file], file.name, { type: file.type })
  }
  const read = new FileReader()
  const fileSize = parseFloat(
    parseInt(disposeFile['size']) / 1024 / 1024
  ).toFixed(2)
  console.log('fileSize', fileSize)
  console.log('disposeFile', disposeFile)
  // 小于1m不压缩
  if (fileSize < 1) return file
  read.readAsDataURL(disposeFile)
  return new Promise((resolve, reject) => {
    try {
      read.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = function () {
          console.log('this.width', this.width)
          console.log('this.height', this.height)
          let w = Math.floor(this.width * scale),
            h = Math.floor(this.height * scale)
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          let base64
          canvas.setAttribute('width', w)
          canvas.setAttribute('height', h)
          ctx.drawImage(this, 0, 0, w, h)
          console.log('w, h', w, h)
          if (fileSize < 1) {
            // 如果图片小于一兆 那么不执行压缩操作
            // type：图片格式，默认为 image/png,可以是其他image/jpeg等
            // encoderOptions：0到1之间的取值，主要用来选定图片的质量，默认值是0.92，超出范围也会选择默认值。
            // 这个我没看出来效果有啥不一样
            base64 = canvas.toDataURL(disposeFile['type'], 1)
          } else if (fileSize > 1 && fileSize < 2) {
            // 如果图片大于1M并且小于2M 那么压缩0.5
            base64 = canvas.toDataURL(disposeFile['type'], 0.5)
          } else {
            // 如果图片超过2m 那么压缩0.2
            base64 = canvas.toDataURL(disposeFile['type'], 0.2)
          }
          const keys = Object.keys(encoderOptions)
          if (keys.length) {
            keys.forEach
          } else {
            base64 = canvas.toDataURL(disposeFile['type'])
          }
          resolve(dataURLtoFile(base64, disposeFile.name))
        }
      }
    } catch (error) {
      reject(disposeFile)
    }
  })
}
/**
 * @description: 将base64编码转回file文件
 */
function dataURLtoFile(dataurl, fileName) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    // atob() 方法用于解码使用 base-64 编码的字符串。
    // base-64 编码使用方法是 btoa()
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, {
    type: mime,
  })
}
