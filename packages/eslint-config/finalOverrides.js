module.exports = [
  // dprint: https://github.com/rmobis/eslint-plugin-dprint#-usage
  {
    files: ['*'],
    rules: {
      "@phaphoso/dprint/dprint": 'error'
    },
  },

  // These suffix also matches more broad '*.js' and '*.ts', so need to be overridden last
  // From: https://github.com/antfu/eslint-config/blob/b34da44baf49180b94b2518e2a07db66410bcbce/packages/basic/index.js
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
      'import/no-unresolved': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
]
