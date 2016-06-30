'use strict'

let serveStatic = require('serve-static')
let Webpack = require('webpack')

let config = require('../config')
let webpackConfig = require('../webpack.config')
let compiler = Webpack(webpackConfig)





module.exports = {
  app: {
    options: {
      middleware: function (connect, options) {
        let middlewares = [
          require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
          }),
          require('webpack-hot-middleware')(compiler, {
            log: console.log
          }),
//          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },
      port: process.env.PORT || config.server.port
    }
  }
}
