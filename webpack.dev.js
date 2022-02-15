const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = (env = {}) => {
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: 'dist',
      host: '127.0.0.1',
      port: 3000,
      watchFiles: ['src/public/index.html']
    }
  })
};
