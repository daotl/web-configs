/* eslint-disable ts/no-non-null-assertion */

import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import {
  GLOB_MARKDOWN_CODE,
  GLOB_TS,
  GLOB_TSX,
  renameRules,
} from '@antfu/eslint-config'
import pluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import pluginTsdoc from 'eslint-plugin-tsdoc'

import { rules } from './index.js'

/**
 * @param extraExtensions - ['.mdx', '.vue']
 */
export function typescript(
  extraExtensions: string[] = [],
): TypedFlatConfigItem[] {
  const files = [
    GLOB_TS,
    GLOB_TSX,
    '**/*.d.ts',
    ...extraExtensions.map(extension => `*${extension}`),
  ]

  return [
    // Don't set `parserOptions.project` for `*.md/*.ts` or we'll get:
    //   error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/src/modules/README.md/0_0.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
    //   However, that TSConfig does not include this file.
    {
      files,
      ignores: [GLOB_MARKDOWN_CODE],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          project: ['./tsconfig.json'],
          extraFileExtensions: extraExtensions,
        },
      },
    },
    // Theses also works for .vue, .mdx, etc.
    {
      files,
      plugins: {
        tsdoc: pluginTsdoc,
      },
      rules: {
        // plugin:@typescript-eslint/recommended
        // `@antfu/eslint-config` already includes `@typescript-eslint/eslint-recommended`
        ...renameRules(
          // biome-ignore lint/style/noNonNullAssertion: ignore 3rd party
          pluginTs.configs.recommended.rules!,
          { '@typescript-eslint': 'ts' },
        ),

        // TS
        // Sometimes using `type x = {}` is necessary
        // Issue with interface: https://stackoverflow.com/questions/63617344/how-to-satisfy-the-constraint-of-recordstring-unknown-with-interface
        // 'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-indexed-object-style': ['error', 'record'],
        'ts/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', disallowTypeAnnotations: false },
        ],
        'ts/prefer-ts-expect-error': 'error',

        // Override JS
        'no-useless-constructor': 'off',
        indent: 'off',
        'no-redeclare': 'off',
        'ts/no-redeclare': 'error',
        'no-use-before-define': 'off',
        'ts/no-use-before-define': [
          'error',
          { functions: false, classes: false, variables: true },
        ],
        'no-dupe-class-members': 'off',
        'ts/no-dupe-class-members': 'error',

        // off
        // 'ts/naming-convention': 'off',
        'ts/explicit-function-return-type': 'off',
        // 'ts/explicit-member-accessibility': 'off',
        // 'ts/parameter-properties': 'off',
        'ts/no-empty-interface': 'off',
        'ts/ban-ts-ignore': 'off',
        'ts/no-empty-function': 'off',
        // 'ts/no-non-null-assertion': 'off',
        // 'ts/explicit-module-boundary-types': 'off',

        /* Above from @antfu/eslint-config-ts/index.js */

        'ts/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
          },
        ],
        'ts/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],

        // TypeScript already checks this: https://stackoverflow.com/a/67018836
        'no-undef': 'off',
        'ts/array-type': [
          'error',
          // { default: 'array', readonly: 'array' }, // default
        ],
        'ts/no-explicit-any': [
          'error',
          // {
          //   fixToUnknown: true, // default
          //   ignoreRestArgs: false, // default
          // },
        ],
        'ts/no-inferrable-types': 'off',

        'tsdoc/syntax': 'warn',
      },
    },

    // These works for .vue, but not for .mdx or code in .md files
    {
      files,
      ignores: ['**/*.mdx', GLOB_MARKDOWN_CODE],
      rules: {
        // `plugin:@typescript-eslint/recommended-type-checked`
        ...renameRules(
          // biome-ignore lint/style/noNonNullAssertion: ignore 3rd party
          pluginTs.configs['recommended-type-checked'].rules!,
          { '@typescript-eslint': 'ts' },
        ),

        // Override `plugin:@typescript-eslint/recommended-type-checked`
        'ts/ban-ts-comment': [
          'error',
          { 'ts-ignore': 'allow-with-description' },
        ],
        // 'ts/ban-types': 'off',
        // 'ts/no-explicit-any': 'off',
        'no-loss-of-precision': 'off',
        'ts/no-loss-of-precision': 'error',
        // 'ts/no-namespace': 'off',
        'no-unused-vars': 'off',
        'ts/no-unused-vars': rules['no-unused-vars'],

        // TS strict rules
        'ts/prefer-return-this-type': 'error',
        // Others
        'dot-notation': 'off',
        'ts/dot-notation': [
          'error',
          { allowIndexSignaturePropertyAccess: true },
        ],
      },
    },
  ]
}
