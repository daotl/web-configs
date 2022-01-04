module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['simple-import-sort', 'import'],
  settings: {
    'import/resolver': {
      webpack: {},
    },
    'import/internal-regex': '^~/',
  },
  env: {
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
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
    // Preferred over 'import/order`
    // See: https://github.com/lydell/eslint-plugin-simple-import-sort#how-is-this-rule-different-from-importorder
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
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
  },
}
