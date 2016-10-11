'use strict'

let BowerWebpackPlugin = require('bower-webpack-plugin')
let path = require('path')
let Webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');


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
    publicPath: '',
    sourceMapFilename: 'app.js.map'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: /scss/,
        loaders: [
          'style',
          'css',
          'sass?outputStyle=expanded'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract('css!sass')
      // },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]'
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
      // {
      //   test: /\.html$/,
      //   loader: 'html'
      // }
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
    new CopyWebpackPlugin([ { from: 'assets/**/*', to: '.' } ]),
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new Webpack.ResolverPlugin(
      new Webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    // new ExtractTextPlugin('/app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'LOCAL Pine Cliff Woodworks - Board Builder',
      template: 'templates/index.ejs'
    }),
    new Webpack.optimize.DedupePlugin()
  ],

  resolve: {
    modulesDirectories: ["node_modules", "bower_components"],
    alias: {
      collections: path.resolve(__dirname, 'js', 'collections'),
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
