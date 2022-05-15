const tsOverride = require('@daotl/eslint-config/tsOverride')

const base = require('./base')
const vueOverrides = require('./vueOverrides')

module.exports = {
  extends: [
    '@daotl/eslint-config/typescript-base',
    '@vue/typescript/recommended',
    './base',
  ],
  settings: {
    'import/extensions': [...base.settings['import/extensions'], '.ts', '.tsx'],
  },
  overrides: [
    {
      ...tsOverride,
      files: [...tsOverride.files, '*.vue', '*.mdx'],
    },
    ...vueOverrides,
  ],
}
