const plugins = [
  "@babel/plugin-syntax-jsx",
  "@babel/plugin-transform-runtime",
  "@babel/plugin-transform-async-to-generator",
  [
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]
];

const getConf = (env) => {
  return {
    presets: [
      ["@babel/preset-env", { "modules": env === 'test' ? undefined : false }],
      "@vue/babel-preset-jsx"
    ],
    plugins,
    sourceType: env === 'test' ? undefined : 'unambiguous'
  };
};

module.exports = {
  "env": {
    "development": getConf('development'),
    "production": getConf('production'),
    "test": getConf('test')
  },
};
