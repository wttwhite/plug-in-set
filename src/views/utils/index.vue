<template>
  <div ref="utilsDom" class="a">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-change="handleChange"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img :src="fileZipImg"/>
    <video :src="fileZipImg"/>
  </div>
</template>
<script>
// import {
// hasClass,
// addClass,
// removeClass,
// toggleClass,
// getWeather,
// hideSensitiveText,
// getOrigin,
// checkIDStrict,
// } from '../../../packages/utils/lib/index.esm'
import compressImg from '../../../packages/utils/src/file/compress-img'

import ImageCompressor from 'js-image-compressor'

import JSZip from 'jszip'
import axios from 'axios'
export default {
  name: 'utils',
  data() {
    return {
      imageUrl: '',
      fileZipImg: ''
    }
  },
  mounted() {
    // console.log('utils', hasClass(this.$refs.utilsDom, 'a'))
    // addClass(this.$refs.utilsDom, 'b')
    // addClass(this.$refs.utilsDom, 'c d')
    // removeClass(this.$refs.utilsDom, 'b')
    // removeClass(this.$refs.utilsDom, 'c d')
    // toggleClass(this.$refs.utilsDom, 'b')
    // console.log(getWeather())
    // console.log(hideSensitiveText('330480184578523698', 5, 14))
    // console.log(checkIDStrict('330480182512124755'))
    this.testZip()
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload-file', file)
    },
    async handleChange(file, fileList) {
      console.log('file', file) // 1609194
      // const afterFile = await compressImg(file.raw)
      // console.log('afterFile', afterFile) // 0.5 407784
      // console.log('this.imageUrl', this.imageUrl)

      const compressorFile = await this.imageCompressor(file.raw)
      console.log('compressorFile', compressorFile)
      const read = new FileReader()
      read.readAsDataURL(compressorFile)
      read.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        this.imageUrl = img.src
      }
    },
    imageCompressor(file) {
      return new Promise((reslove, reject) => {
        try {
          new ImageCompressor({
            file,
            quality: 0.15,
            success: (result) => {
              reslove(result)
            },
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    async testZip(){
      const zip = new JSZip()
      const file = await axios.get('/test-zip.zip', {responseType: 'blob'} )
      console.log('file', file)
      zip.loadAsync(file.data).then(async (res) => {
        console.log(res.files)
        // const base64 = await res.file('test-zip/daping.png').async('string')
        const blob = await res.file('test-zip/daping.png').async('blob')
        // const base64 = await res.file('test-zip/daping.png').asText()
        // const buffer = await res.file('test-zip/daping.png').asArrayBuffer()
        // return res.file()
        // let base64 = this.arrayBufferToBase64(buffer)
        // base64 = 'data:image/png;base64,' + base64
        // console.log(base64)
        const read = new FileReader()
        read.readAsDataURL(blob)
        // read.readAsDataURL(new Blob([base64], { type: base64.type }))
        read.onload = (e) => {
          const img = new Image()
          img.src = e.target.result
          this.fileZipImg = img.src
        }
      })
    },
    arrayBufferToBase64( buffer ) { 
      var binary = '';  
      var bytes = new Uint8Array( buffer );  
      var len = bytes.byteLength;  
      for (var i = 0; i < len; i++) { 
          binary += String.fromCharCode( bytes[ i ] );  
      } 
      return window.btoa( binary );  
  }
  },
}
</script>
<style lang="css">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
