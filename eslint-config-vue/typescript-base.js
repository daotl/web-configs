const tsOverrides = require('@daotl/eslint-config/tsOverrides')

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
      ...tsOverrides.general,
      files: [...tsOverrides.general.files, '*.vue'],
    },
    {
      ...tsOverrides.typeChecking,
      files: [...tsOverrides.typeChecking.files, '*.vue'],
    },
    ...vueOverrides,
  ],
}
