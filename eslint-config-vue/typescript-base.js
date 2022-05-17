const vueOverrides = require('./vueOverrides')

module.exports = {
  extends: ['@daotl/eslint-config/browser-typescript-base'],
  overrides: vueOverrides(true),
}
