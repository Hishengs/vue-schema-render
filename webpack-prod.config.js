// const fs = require('fs');
// const path = require('path');
const merge = require('lodash/merge');
const baseConfig = require('./webpack-base.config.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    library: 'SchemaRender',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  externals: {
    vue: 'vue'
  },
  /* optimization: {
    minimize: false
  }, */
});

prodConfig.plugins = [
  ...prodConfig.plugins,
  new BundleAnalyzerPlugin(),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
];

// fs.writeFileSync(path.join(__dirname, './webpack-prod.json'), JSON.stringify(prodConfig, null, 2));

module.exports = prodConfig;