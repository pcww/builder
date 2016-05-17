'use strict'

let serveStatic = require('serve-static')

let config = require('../config')





module.exports = {
  app: {
    options: {
      middleware: function (connect, options) {
        let middlewares = [
          require('connect-livereload')({
            rules: [{
              match: /<\/head>(?![\s\S]*<\/head>)/i,
              fn: function (match, script) {
                return script + match
              }
            }]
          }),
          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },
      port: config.server.port
    }
  }
}
