module.exports = {
  extends: [
    '@daotl/eslint-config/typescript-base',
    './base',
    '@vue/typescript/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'vue'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
