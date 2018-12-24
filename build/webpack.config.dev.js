const path = require('path')
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
  }
}