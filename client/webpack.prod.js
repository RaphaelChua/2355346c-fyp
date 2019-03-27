const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
  entry:[
    '@babel/polyfill',
    './src/index.jsx',
    // 'webpack-dev-server/client?http://0.0.0.0:80',
  ],
  mode :'production',
  performance: { hints: false },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname,".env")
    }),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ]
});
