module.exports = {
  presets: [
    ["@babel/preset-env", { "modules": false }],
    "@vue/babel-preset-jsx"
  ],
  plugins: [
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
  ],
  sourceType: 'unambiguous'
};
