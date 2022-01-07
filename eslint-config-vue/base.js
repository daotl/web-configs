module.exports = {
  extends: ['@daotl/eslint-config/browser-base', 'plugin:vue/vue3-recommended'],
  settings: {
    'import/extensions': ['.js', '.jsx', 'vue'],
  },
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
