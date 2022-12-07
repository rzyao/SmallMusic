/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    //关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    'vue/comment-directive': 'off',
    indent: ['error', 2],
    //prettier规则
    'prettier/prettier': ['error', { semi: true, singleQuote: true, printWidth: 100 }],
  },
};
