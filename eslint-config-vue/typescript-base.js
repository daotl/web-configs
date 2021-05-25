module.exports = {
  extends: [
    '@daotl/eslint-config/typescript-base',
    './base',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    parser: '@typescript-eslint/parser',
  },
}
