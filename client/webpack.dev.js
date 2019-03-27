const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
  entry:[
    './src/index.jsx',
    'webpack-dev-server/client?http://0.0.0.0:8080',
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname,"..",".env")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }  }
});