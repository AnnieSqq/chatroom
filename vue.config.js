const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/theme/default.less') // 全局引入的less文件
      ]
    })
}
module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },

  // 路径别名的配置
  configureWebpack: (config) => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages')
        } // 别名配置
      }
    })
  },
  // 设置开发环境的服务
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 插件配置
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}
