const prodConfig = require('./webpack-prod.config');

prodConfig.output.filename = 'vue-schema-render.umd.js';
prodConfig.output.libraryTarget = 'umd';

// remove clean dist plugin
prodConfig.plugins = prodConfig.plugins.slice(1);

module.exports = prodConfig;