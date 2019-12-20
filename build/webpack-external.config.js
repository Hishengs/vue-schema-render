const path = require('path');

const prodConfig = require('./webpack-prod.config.js');

prodConfig.entry = {
  app: [path.resolve(process.cwd(), './libs/entry-without-element-ui.ts')]
};

prodConfig.output.filename = 'vue-schema-render.external.common.js';
// prodConfig.output.libraryTarget = 'umd';

prodConfig.externals = {
  vue: 'vue',
};

module.exports = prodConfig;