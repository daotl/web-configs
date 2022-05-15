const vueOverrides = require('./vueOverrides')

module.exports = {
  extends: ['@daotl/eslint-config/browser-base'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.vue', '.mdx'],
  },
  overrides: vueOverrides,
}
