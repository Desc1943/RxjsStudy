const webpack        = require('webpack'),
      merge          = require('webpack-merge'),
      WebpackMd5Hash = require('webpack-md5-hash');
let config = require('./webpack.config.js')({ dev: false });

module.exports = merge(config, {
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
});