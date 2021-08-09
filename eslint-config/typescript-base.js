const base = require('./base')

module.exports = {
  extends: [
    './base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      // { default: 'array', readonly: 'array' }, // default
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      // {
      //   fixToUnknown: true, // default
      //   ignoreRestArgs: false, // default
      // },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': base.rules['no-unused-vars'],
    quotes: 'off',
    '@typescript-eslint/quotes': base.rules.quotes,

    // Disable these rules for all files
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      // Enable these rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' },
        ],
        '@typescript-eslint/explicit-function-return-type': ['error'],
      },
    },
  ],
}
