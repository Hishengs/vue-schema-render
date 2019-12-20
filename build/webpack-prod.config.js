const merge = require('lodash/merge');
const baseConfig = require('./webpack-base.config.js');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    library: 'vue-schema-render',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  externals: {
    vue: 'vue',
    'element-ui': './element-ui',
    'element-ui/lib/theme-chalk/index.css': './element-ui/theme-chalk/index.css',
  },
  optimization: {
    minimize: false,
  },
});

prodConfig.plugins = [
  ...prodConfig.plugins,
  // new BundleAnalyzerPlugin(),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
];

module.exports = prodConfig;