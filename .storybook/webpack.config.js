const fs = require('fs');
const path = require('path');
// const projectBaseConfig = require('../webpack-base.config');

module.exports = async ({ config }) => {
  // config.resolve.alias['klk-cms'] = path.join(process.cwd(), '/dist/vue-schema-render.common.js');

  // config.module.noParse = /vue-schema-render\.common\.js/;

  /* config.module.rules.push({
    test: /\.js/,
    exclude: path.join(__dirname, '../dist')
  }); */

  // config.module.rules = [
  //   ...config.module.rules,
  //   ...projectBaseConfig.module.rules,
  // ];

  fs.writeFileSync(path.join(__dirname, './webpack-config.json'), JSON.stringify(config, null, 2));

  return config;
};
