const fs = require('fs');
const path = require('path');

module.exports = async ({ config }) => {
  const [rule] = config.module.rules;
  rule.exclude.push(path.join(__dirname, '../dist'));

  fs.writeFileSync(path.join(__dirname, './webpack-config.json'), JSON.stringify(config, null, 2));

  return config;
};
