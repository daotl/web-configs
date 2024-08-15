/* eslint-disable ts/no-explicit-any */

// Can't import `antfu` with default import or `esbuild` will output problematic CJS import due to this issue:
// https://github.com/evanw/esbuild/issues/2023
import type {
  Awaitable,
  ConfigNames,
  OptionsOverrides,
  StylisticConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import merge from 'deepmerge'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { isPackageExists } from 'local-pkg'

import type { Config } from './config.js'
import { final } from './final.js'
import { typescript } from './typescript.js'

// From: https://github.com/antfu/eslint-config/blob/27b7fe476fd28dafbc5ec5674d4b383255f4bd8f/src/factory.ts#L37C22-L37C22
const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

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
} satisfies TypedFlatConfigItem['rules']

const stylisticOverrides = {
  'style/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
  'style/comma-dangle': ['error', 'always-multiline'],
  'style/lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: true },
  ],
  'style/no-extra-semi': 'error',
  'style/object-curly-spacing': ['error', 'always'],
  'style/quote-props': ['error', 'as-needed'],
  'style/space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  'style/space-infix-ops': ['error', { int32Hint: true }],
} satisfies Exclude<(StylisticConfig & OptionsOverrides)['overrides'], undefined>

export function config(
  _cfg: Config = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    // biome-ignore lint/suspicious/noExplicitAny: ignore
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  // From: https://github.com/antfu/eslint-config/blob/d514bc461572480c62bf3b4f2795d8a44fcd712a/src/factory.ts#L84-L98
  const defaults = {
    // astro: enableAstro = false,
    // autoRenamePlugins = true,
    // componentExts: [],
    // gitignore: enableGitignore = true,
    // isInEditor = isInEditorEnv(),
    // jsx: enableJsx = true,
    // react: enableReact = false,
    // regexp: enableRegexp = true,
    // solid: enableSolid = false,
    // svelte: enableSvelte = false,
    typescript: isPackageExists('typescript'),
    // unocss: enableUnoCSS = false,
    vue: VuePackages.some(i => isPackageExists(i)),
    stylistic: {
      overrides: stylisticOverrides,
    },
    // https://github.com/antfu/eslint-config/blob/d514bc461572480c62bf3b4f2795d8a44fcd712a/src/types.ts#L53-L118
    formatters: {
      /**
       * Enable formatting support for CSS, Less, Sass, and SCSS.
       *
       * Currently only support Prettier.
       */
      // Prefer Stylelint
      // css: 'prettier',
      html: 'prettier',
      // xml: 'prettier',
      markdown: 'dprint',
      graphql: 'prettier',
      /**
       * Install the prettier plugin for handle Slidev markdown
       *
       * Only works when `markdown` is enabled with `prettier`.
       */
      // slidev?: boolean | {
      //   files?: string[];
      // };
      /**
       * Enable formatting support for Astro.
       *
       * Currently only support Prettier.
       */
      astro: _cfg.astro ? 'prettier' : false,
    },
  } satisfies Config

  const cfg = merge(defaults, _cfg)
  const browser =
    cfg.browser || cfg.astro || cfg.react || cfg.solid || cfg.svelte || cfg.vue

  return antfu(
    cfg,
    {
      plugins: {
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
    ...userConfigs,
  )
}
