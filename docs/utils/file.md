# 文件操作

下载依赖

`npm i hsja-utils -D`

## 下载文件码流

一般用于后端接口返回二进制码流，然后下载

```javascript
// 接口中记得加responseType: 'blob'
import { downloadFile } from 'hsja-utils'
downloadFile(data, fileName)
downloadFile(data) // 不传fileName，默认使用后端headers中给的filename的值
```

## 下载文件通过url

主要用于前端或者后端存储的静态文件的下载

```javascript
import { dowloadByUrl} from 'hsja-utils'
downloadFile(str, fileName)
// dowloadByUrl(`${ViteApiUrl}/shouye-ppt.pptx`, '住建局ppt.pptx')
```
