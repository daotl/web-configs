const config = require('@daotl/dprint-config')

module.exports = [
  // dprint: https://github.com/rmobis/eslint-plugin-dprint#-usage
  {
    files: ['*.js', '*.cjs', '*.mjs', '*.jsx', 'ts', '*.cts', '*.mts', '*.tsx'],
    extends: ['plugin:@phaphoso/dprint/recommended'],
    rules: {
      '@phaphoso/dprint/dprint': [
        'error',
        {
          config: config.typescript,
        },
      ],
    },
  },

  // These suffix also matches more broad '*.js' and '*.ts', so need to be overridden last
  // https://github.com/antfu/eslint-config/blob/37a4d762c388220b97790c5b7b12618426bd2fee/packages/basic/index.js
  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    files: ['scripts/**/*.*', 'cli.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
    rules: {
      'no-unused-expressions': 'off',
      'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    // Code blocks in markdown file
    files: ['**/*.md', '**/*.md/*.*'],
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
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
]
