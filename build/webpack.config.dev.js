const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
function resolve(dir){
  return path.join(__dirname,'..', dir)
}
module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, '../src/main.js')
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
  devServer: {
    contentBase: resolve('/dist'),
    historyApiFallback: true,
    host: 'localhost',
    open: true,
    inline: true,
    port: 8000,
    compress: true, //服务器返回给浏览器的时候是否启动gzip压缩
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'development'
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


