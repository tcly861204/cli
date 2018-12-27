const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
function resolve(dir){
  return path.join(__dirname,'..', dir)
}

module.exports = {
  mode: 'production',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new cleanWebpackPlugin('dist', {
      root: resolve('/'),
      verbose: false,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      filename: 'index.html',
      favicon: resolve('public/favicon.ico'),
      inject: 'body',
      title: 'Webpack App',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}