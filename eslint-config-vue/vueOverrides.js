const antfu = require('@antfu/eslint-config-vue')
const tsOverrides = require('@daotl/eslint-config/tsOverrides')

const tsGeneralConf = tsOverrides.general(['.vue', '.mdx'])
const tsGeneralConfRulesOnly = tsOverrides.general(['.vue', '.mdx'], true)
const tsTypeCheckingConf = tsOverrides.typeChecking(['.vue'])
const tsTypeCheckingConfRulesOnly = tsOverrides.typeChecking(['.vue'], true)

const tsExplicitFunctionReturnType =
  tsGeneralConf.rules['@typescript-eslint/explicit-function-return-type']
const tsExplicitFunctionReturnTypeConf = tsExplicitFunctionReturnType[1] || {}

module.exports = (typescript) =>
  // TS config comes first, so Vue's parser settings and rules can override
  // But custom TS rules need to override once more at the end
  (typescript ? [tsGeneralConf, tsTypeCheckingConf] : []).concat(
    [
      {
        files: ['*.mdx'],
        extends: ['plugin:mdx/recommended'],
      },
      {
        files: ['*.vue', '*.js', '*.jsx', '*.mdx'].concat(
          typescript ? ['*.ts', '*.tsx', '*.d.ts'] : [],
        ),
        extends: ['plugin:vue/vue3-recommended'].concat(
          typescript ? ['@vue/typescript/recommended'] : [],
        ),
        parser: 'vue-eslint-parser',
        parserOptions: {
          ...(typescript ? { parser: '@typescript-eslint/parser' } : {}),
        },
        rules: antfu.rules,
      },
      {
        files: ['*.vue'],
        rules: {
          // Disabled for Vue <script setup>
          'no-undef': 'off',
          // Disabled for <script setup lang="ts">
          '@typescript-eslint/unbound-method': 'off',
        },
      },
      {
        files: ['*.stories.js', '*.stories.jsx', '*.stories.mdx'].concat(
          typescript ? ['*.stories.ts', '*.stories.tsx'] : [],
        ),
        rules: {
          '@typescript-eslint/explicit-function-return-type': [
            tsExplicitFunctionReturnType[0],
            {
              ...tsExplicitFunctionReturnTypeConf,
              allowedNames: [
                ...(tsExplicitFunctionReturnTypeConf.allowedNames || []),
                'setup',
              ],
            },
          ],
        },
      },
    ]
      // Custom TS rules need to override once more at the end
      .concat(
        typescript ? [tsGeneralConfRulesOnly, tsTypeCheckingConfRulesOnly] : [],
      ),
  )
