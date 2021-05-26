module.exports = {
  extends: [
    '@daotl/eslint-config/typescript-base',
    './base',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
