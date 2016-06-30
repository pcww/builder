'use strict'





let BowerWebpackPlugin = require('bower-webpack-plugin')
let path = require('path')
let Webpack = require('webpack')





module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'js', 'bootstrap.js')
  ],

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    sourceMapFilename: 'app.js.map'
  },

  module: {
    loaders: [
      {
        include: /scss/,
        loaders: [
          'style',
          'css',
          'sass?outputStyle=expanded'
        ],
        test: /\.scss$/
      },
      {
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel'],
        test: /\.js|\.jsx$/
      },
      {
        loader: 'json',
        test: /\.json$/
      }
    ]
  },

  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
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
      models: path.resolve(__dirname, 'js', 'models'),
      three: path.resolve(__dirname, 'bower_components', 'three.js', 'examples', 'js'),
      views: path.resolve(__dirname, 'js', 'views')
    }
  },

  stats: {
    colors: true,
    reasons: true
  },

  target: 'web'
}
