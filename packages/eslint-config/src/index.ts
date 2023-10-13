import antfu, { type ConfigItem } from '@antfu/eslint-config'
// @ts-expect-error: no types
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { isPackageExists } from 'local-pkg'

import type { Config } from './config.js'
import final from './final.js'
import typescript from './typescript.js'

export const rules = {
  'arrow-parens': ['error', 'always'],
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
} satisfies ConfigItem['rules']

// From: https://github.com/antfu/eslint-config/blob/7c19e696baac8f3afcb23fd08bdd7b510ef05fbf/src/factory.ts#L37C22-L37C22
const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

export default function config(_cfg: Config = {}): ConfigItem[] {
  // From: https://github.com/antfu/eslint-config/blob/7c19e696baac8f3afcb23fd08bdd7b510ef05fbf/src/factory.ts#L48-L55
  const cfg = {
    // isInEditor: !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: VuePackages.some((i) => isPackageExists(i)),
    typescript: isPackageExists('typescript'),
    // gitignore: true,
    // overrides: {},
    // componentExts: [],
    ..._cfg,
  }
  const browser = cfg.browser || cfg.vue

  return [
    ...antfu(cfg),

    {
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
    },

    ...(cfg.typescript ? typescript() : []),
    ...final,
  ]
}
