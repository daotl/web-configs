const antfu = require('@antfu/eslint-config-vue')

const tsOverrides = require('@daotl/eslint-config/tsOverrides')

const tsExplicitFunctionReturnType =
  tsOverrides.general.rules['@typescript-eslint/explicit-function-return-type']
const tsExplicitFunctionReturnTypeConf = tsExplicitFunctionReturnType[1] || {}

module.exports = [
  {
    files: ['*.vue'],
    extends: ['plugin:vue/vue3-recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      extraFileExtensions: ['.vue'],
    },
    rules: {
      // Disabled for Vue <script setup>
      'no-undef': 'off',
      // Disabled for <script setup lang="ts">
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['*.vue', '*.jsx', '*.tsx'],
    rules: antfu.rules,
  },
  {
    files: ['*.stories.js', '*.stories.ts'],
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
  {
    files: ['*.mdx'],
    extends: ['plugin:mdx/recommended'],
  },
]
