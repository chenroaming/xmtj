const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true, // 是否开启 esLint
  productionSourceMap: false, // 默认是开启的，关闭后打包的代码易读易线上调式，也可加快打包速度
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  publicPath:
    '/dist/', // 项目根目录
  devServer: {
    port: 8083,
    proxy: {
      '/test': {
        target: 'https://xmtj.olcourt.cn/api/', // 法院框架后端地址，新项目改为你真实的后端地址
        // 路径重写
        pathRewrite: {
          '^/test': ''
        },
        secure: false, // 如果是https接口，需要配置这个参数为true
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置为true
      },
      '/api': {
        target: 'https://xmtj.olcourt.cn/api/',
        pathRewrite: {
          '^/api': '/'
        },
        secure: true, // 如果是https接口，需要配置这个参数为true
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置为true
      },
      '/upload': {
        target: 'https://xmtj.olcourt.cn/upload/',
        pathRewrite: {
          '^/upload': '/'
        },
        secure: true, // 如果是https接口，需要配置这个参数为true
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置为true
      },
      '/upload': {
        target: 'https://xmtj.olcourt.cn/upload/',
        pathRewrite: {
          '^/upload': '/'
        },
        secure: true, // 如果是https接口，需要配置这个参数为true
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置为true
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000
      // 只给出 js 文件的性能提示
      // assetFilter: function(assetFilename) {
      //   return assetFilename.endsWith(".js");
      // }
    }
  }

}
