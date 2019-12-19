
const path = require('path');
const merge = require('lodash/merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack-base.config.js');

const template = path.join(process.cwd(), './test/index.html');

const devConfig = merge(baseConfig, {
  mode: 'development',
  entry: {
    app: path.join(process.cwd(), './test/index.ts')
  },
  output: {
    path: path.resolve(process.cwd(), './dev-dist'),
  },
  devServer: {
    contentBase: path.join(process.cwd(), './dist'),
    host: 'localhost',
    port: 8686,
    compress: true,
    hot: true,
  },
});

devConfig.plugins = [
  ...devConfig.plugins,
  new HtmlWebpackPlugin({
    template,
  })
];

module.exports = devConfig;