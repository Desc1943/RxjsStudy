const base       = require('./base/base.js'),
      files      = require('./base/files'),
      path       = require('path'),
      webpack    = require('webpack');
const vendors = [
  // 'react-hot-loader/patch',
  'react-hot-loader',
  /**
   * babel-polyfill 支持到es5
   * */
  'babel-polyfill',

  // 其他依赖
  'immutable',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-immutablejs',
  'redux-logger',
  'redux-observable',
  'rxjs',
];

module.exports = {
  output: {
    path: files.dllPath,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: path.join(files.dllPath, 'vendors.json'),
      name: '[name]',
      context: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    })
  ],
};
