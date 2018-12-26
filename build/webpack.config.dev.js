const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
function resolve(dir){
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  mode: 'development',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('dist'),
    publicPath: '/',
    chunkFilename:'js/[name].[chunkhash:8].js'
  },
  devServer: {
    contentBase: resolve('public/'),
    historyApiFallback: true,
    host: '0.0.0.0',
    open: true,
    inline: true,
    port: 8000,
    compress: true, //服务器返回给浏览器的时候是否启动gzip压缩
  },
  module: {
    unknownContextCritical : false,
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        }
      }
    }
  },
  plugins: [
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