const vueOverrides = require('./vueOverrides')

module.exports = {
  extends: [
    '@daotl/eslint-config/browser-typescript-base',
    '@vue/typescript/recommended',
  ],
  overrides: vueOverrides(true),
}
