module.exports = {
  extends: [
    './base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // vars: 'all', // default
        args: 'none', // default: after-used
      },
    ],
    quotes: 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],

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
