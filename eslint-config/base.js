module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': [
      'error',
      {
        // vars: 'all', // default
        varsIgnorePattern: '^_',
        args: 'none', // default: after-used
      },
    ],
    'prefer-const': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
  },
}
