const webpack = require('webpack')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')

const webpackDevConfig = require('./webpack.config.dev')
const spinner = ora('building for development...')
spinner.start()
rm(path.join(__dirname, '../dist'), err=>{
  if (err) throw err
  webpack(webpackDevConfig, function(err, stats){
    spinner.stop()
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n' )
  })
})
