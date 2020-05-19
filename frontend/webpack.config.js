const path = require('path')

module.exports = {
  entry: {
    frontend: './js/frontend',
    admin: './js/admin',
  },
  output: {
    path: __dirname.split('/').slice(0, -1).join('/') + '/public/js',
    filename: '[name].js'
  },
  watch: true,
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'js'),
        loader: 'babel-loader?presets[]=@babel/env'
      }
    ]
  }
}
