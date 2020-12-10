module.exports = {
  roots: [
    '<rootDir>/test',
    '<rootDir>/libs'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '.*\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/libs/$1",
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js'
  },
  transformIgnorePatterns: [
    // 'node_modules/(?!vue-router)'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
