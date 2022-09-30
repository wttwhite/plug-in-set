const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === 'production' ? '' : './',
  filenameHashing: true,
  assetsDir: '',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // mock
      '/mock': {
        target: 'http://192.168.3.230:8090',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
    },
  },
})
