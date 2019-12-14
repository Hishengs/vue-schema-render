module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'space-before-function-paren': 'off',
    'no-underscore-dangle': 'off',
    'no-else-return': 'off',
    'lines-between-class-members': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-return-await': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'prefer-template': 'warn',
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-await-in-loop': 'off',
    'no-lonely-if': 'off',
    'import/no-named-as-default-member': 'off',
    'no-nested-ternary': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
