const fs = require('fs');
const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['vue-schema-render'] = path.join(__dirname, '../dist/vue-schema-render.common.js');

  const [rule] = config.module.rules;
  rule.exclude.push(path.join(__dirname, '../dist'));

  fs.writeFileSync(path.join(__dirname, './webpack-config.json'), JSON.stringify(config, null, 2));

  return config;
};
