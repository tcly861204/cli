const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
function resolve(dir){
  return path.resolve(__dirname,'..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('dist/'),
    publicPath: '/'
  },
  devServer: {
    contentBase: resolve('dist/'),
    host: '0.0.0.0',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      inject: true
    }),
  ]
}