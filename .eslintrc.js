module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-restricted-syntax': ['off'],
    'import/no-dynamic-require': ['off'],
    'global-require': ['off'],
    'no-param-reassign': ['off'],
  },
};
