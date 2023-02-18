const antfu = require('@antfu/eslint-config-vue')
const genTsOverrides = require('@daotl/eslint-config/tsOverrides')

const tsOverrides = genTsOverrides(['.vue', '.mdx'])

module.exports = (typescript) => [
  // TS config comes first, so Vue's parser settings and rules can override
  // But custom TS rules need to override once more at the end
  ...(typescript ? tsOverrides : []),

  {
    files: [
      '*.vue',
      '*.js',
      '*.jsx',
      '*.mdx',
      ...(typescript ? ['*.ts', '*.tsx', '*.d.ts'] : []),
    ],
    extends: [
      'plugin:vue/vue3-recommended',
      ...(typescript ? ['@vue/typescript/recommended'] : []),
    ],
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

  // MDX cannot use "vue-eslint-parser", so override here
  {
    files: ['*.mdx'],
    extends: ['plugin:mdx/recommended'],
  },

  // Custom TS rules need to override once more at the end
  ...(typescript
    ? // Set only "files" and "rules" fields
      tsOverrides.map((o) => ({
        files: o.files,
        excludedFiles: o.excludedFiles,
        rules: o.rules,
      }))
    : []),

  // Storybook specific rules
  {
    files: [
      '*.stories.js',
      '*.stories.jsx',
      '*.stories.mdx',
      ...(typescript ? ['*.stories.ts', '*.stories.tsx'] : []),
    ],
  },
]
