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
  },
}
