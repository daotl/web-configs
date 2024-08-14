// import dprint from '@phaphoso/eslint-plugin-dprint'
// import dprintConfig from '@daotl/dprint-config'
import {
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_TESTS,
  type TypedFlatConfigItem,
} from '@antfu/eslint-config'

export const final = [
  // Not using `dprint` anymore as `@antfu/eslint-config` seems to be enough
  // dprint: https://github.com/rmobis/eslint-plugin-dprint#-usage
  // {
  //   files: [
  //     '*.js',
  //     '*.cjs',
  //     '*.mjs',
  //     '*.jsx',
  //     '*.ts',
  //     '*.cts',
  //     '*.mts',
  //     '*.tsx',
  //   ],
  //   plugins: { dprint },
  //   rules: {
  //     ...dprint.configs['disable-conflict-rules'].rules,
  //     '@phaphoso/dprint/dprint': [
  //       'error',
  //       {
  //         config: dprintConfig.typescript,
  //       },
  //     ],
  //   },
  // },

  // Need to override after `*.ts`
  // https://github.com/antfu/eslint-config/blob/7c19e696baac8f3afcb23fd08bdd7b510ef05fbf/src/configs/typescript.ts#L116-L125
  {
    files: ['**/*.d.ts'],
    name: 'daotl:typescript:dts-overrides',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    files: ['scripts/**/*.*', 'cli.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: GLOB_TESTS,
    rules: {
      'no-unused-expressions': 'off',
      'test/no-only-tests': 'error',
    },
  },
  {
    // Code blocks in markdown file
    files: [GLOB_MARKDOWN, GLOB_MARKDOWN_CODE],
    rules: {
      'ts/no-redeclare': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-use-before-define': 'off',
      'ts/no-var-requires': 'off',
      'ts/consistent-type-imports': 'off',
      'import/no-unresolved': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
] satisfies TypedFlatConfigItem[]
