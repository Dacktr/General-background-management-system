const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // error Component name “index“ should always be multi-word vue/multi-word-component-names
  //原因：在编译的时候eslint 会检测将次写法判定为不规格。
  //vue.config.js文件加   lintOnSave: false
  lintOnSave: false
})


