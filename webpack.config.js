const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['./client/index.js', 'babel-polyfill'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []
}
