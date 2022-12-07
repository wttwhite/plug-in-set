export default function downloadFile(res, fileName) {
  const blob = new Blob([res], { type: res.type })
  let dom = document.createElement('a')
  //创建下载链接
  let url = window.URL.createObjectURL(blob) 
  if (!fileName) {
    fileName = res.headers['content-disposition']
    ? res.headers['content-disposition'].split('attachment;filename=')[1]
    : new Date().getTime()
  }
  dom.href = url
  // 解码
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  // 释放掉blob对象
  window.URL.revokeObjectURL(url)
}
