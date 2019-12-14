module.exports = {
  presets: [
    "@babel/preset-env",
    "@vue/babel-preset-jsx"
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator"
  ],
  sourceType: 'unambiguous'
};
