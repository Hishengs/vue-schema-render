const fs = require('fs');
const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
  ],
  "webpackFinal": config => {
    // config.resolve.alias['vue-schema-render'] = path.join(__dirname, '../dist/vue-schema-render.common.js');
    config.resolve.alias['vue-schema-render'] = path.join(__dirname, '../libs/index.ts');
    config.resolve.alias['@'] = path.join(__dirname, '../libs/');

    const [rule] = config.module.rules;
    // console.log('>>> rule.exclude', rule.exclude);
    if (rule.exclude == null) rule.exclude = [];
    if (!Array.isArray(rule.exclude)) rule.exclude = [rule.exclude];
    rule.exclude.push(path.join(__dirname, '../dist'));

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });

    // fs.writeFileSync(path.join(__dirname, './webpack-config.json'), JSON.stringify(config, null, 2));

    return config;
  }
}
