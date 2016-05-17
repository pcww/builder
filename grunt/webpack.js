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
          test: /\.json$/,
          loader: 'json'
        },
        {
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          test: /\.js$/,
          query: {
            presets: ['es2015', 'react']
          }
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
        exampleRequireAlias: path.resolve(__dirname + '/../js/exampleRequireAlias')
      }
    },

    stats: {
      colors: true,
      reasons: true
    }
  }
}
