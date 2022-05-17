const vueOverrides = require('./vueOverrides')

module.exports = {
  extends: ['@daotl/eslint-config/browser-base'],
  overrides: vueOverrides(false),
}
