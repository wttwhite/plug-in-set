export default function downloadFile(res, fileName) {
  const blob = new Blob([res], { type: res.type })
  let dom = document.createElement('a')
  let url = window.URL.createObjectURL(blob)
  dom.href = url
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  window.URL.revokeObjectURL(url)
}
