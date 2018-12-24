const webpack = require('webpack')
const webpackDevConfig = require('./webpack.config.dev')
const ora = require('ora')
const spinner = ora('building for development...')
spinner.start()
webpack(webpackDevConfig, function(err, stats){
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n' )
})