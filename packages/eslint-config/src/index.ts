// Can't import `antfu` with default import or `esbuild` will output problematic CJS import due to this issue:
// https://github.com/evanw/esbuild/issues/2023
import type { Awaitable, FlatConfigItem, UserConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
// @ts-expect-error: no types
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { isPackageExists } from 'local-pkg'

import type { Config } from './config.js'
import final from './final.js'
import typescript from './typescript.js'

export const rules = {
  curly: ['error', 'all'],
  'no-unused-vars': [
    // prefer unused-imports/no-unused-vars
    'off',
    // {
    //   // vars: 'all', // default
    //   varsIgnorePattern: '^_',
    //   args: 'all', // default: after-used
    //   ignoreRestSiblings: true,
    //   argsIgnorePattern: '^_',
    //   destructuredArrayIgnorePattern: '^_',
    //   caughtErrors: 'all',
    //   caughtErrorsIgnorePattern: '^_',
    // },
  ],
  'no-void': ['error', { allowAsStatement: true }],

  // Imports
  // 'import/no-unresolved': [
  //   'error',
  //   {
  //     ignore: [
  //       // For Vite virtual module
  //       '^virtual:',
  //     ],
  //   },
  // ],
  // Preferred "simple-import-sort" over "import/order"
  // See: https://github.com/lydell/eslint-plugin-simple-import-sort#how-is-this-rule-different-from-importorder
  'sort-imports': 'off',
  'import/order': 'off',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'import/first': 'error',
  'import/newline-after-import': ['error', { considerComments: false }],
  'import/no-duplicates': 'error',
  // See: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
  // 'import/order': [
  //   'error',
  //   {
  //     groups: [
  //       'builtin',
  //       'external',
  //       'internal',
  //       'parent',
  //       'sibling',
  //       'index',
  //     ],
  //     pathGroups: [
  //       // Project root
  //       {
  //         pattern: '~/**',
  //         group: 'internal',
  //       },
  //     ],
  //     alphabetize: { order: 'asc' },
  //     warnOnUnassignedImports: true,
  //   },
  // ],

  'style/quote-props': ['error', 'as-needed'],
} satisfies FlatConfigItem['rules']

// From: https://github.com/antfu/eslint-config/blob/27b7fe476fd28dafbc5ec5674d4b383255f4bd8f/src/factory.ts#L37C22-L37C22
const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

export default function config(
  _cfg: Config = {},
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
  // From: https://github.com/antfu/eslint-config/blob/27b7fe476fd28dafbc5ec5674d4b383255f4bd8f/src/factory.ts#L55-L64
  const cfg = {
    // componentExts: [],
    // gitignore: enableGitignore = true,
    // isInEditor = !!((process.
    // react: enableReact = false,
    typescript: isPackageExists('typescript'),
    // unocss: enableUnoCSS = false,
    vue: VuePackages.some(i => isPackageExists(i)),
    stylistic: true,
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      // Prefer Stylelint
      // css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'dprint',
    } as const,
    ..._cfg,
  }
  const browser = cfg.browser || cfg.vue

  return antfu(cfg, {
    plugins: {
      // eslint-disable-next-line ts/no-unsafe-assignment
      'simple-import-sort': pluginSimpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...(browser && {
          ...globals.browser,
          ...globals.worker,
          ...globals.serviceworker,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        }),
      },
    },
    settings: {
      'import/internal-regex': '^~/',
    },
    rules,
  }, ...(cfg.typescript ? typescript() : []), ...final, ...userConfigs)
}
