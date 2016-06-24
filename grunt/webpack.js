'use strict'

let BowerWebpackPlugin = require('bower-webpack-plugin')
let path = require('path')
let Webpack = require('webpack')





module.exports = {
  app: {
    devtool: 'source-map',

    entry: './js/bootstrap.js',

    output: {
      filename: 'dist/app.js',
      sourceMapFilename: 'dist/app.js.map'
    },

    module: {
      loaders: [
        {
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          test: /\.js|\.jsx$/
        },
        {
          loader: 'json',
          test: /\.json$/
        }
      ]
    },

    plugins: [
      new BowerWebpackPlugin({
        excludes: [
          /.*\.css$/,
          /.*\.less/,
          /.*\.scss$/
        ]
      }),
      new Webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
      })
    ],

    resolve: {
      alias: {
        three: path.resolve(__dirname + '/../bower_components/three.js/examples/js')
      }
    },

    stats: {
      colors: true,
      reasons: true
    }
  }
}
