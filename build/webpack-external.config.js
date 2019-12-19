const prodConfig = require('./webpack-prod.config.js');

prodConfig.output.filename = 'vue-schema-render.external.common.js';

prodConfig.externals = {
  vue: 'vue',
  'element-ui': 'element-ui'
};

module.exports = prodConfig;