module.exports = {
  root: true,
  extends: ['@antfu/basic'],
  plugins: ['simple-import-sort'],
  settings: {
    'import/resolver': {
      webpack: {},
    },
    'import/internal-regex': '^~/',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    'antfu/if-newline': 'off',
    'no-unused-vars': [
      'error',
      {
        // vars: 'all', // default
        varsIgnorePattern: '^_',
        args: 'none', // default: after-used
      },
    ],
    'no-void': ['error', { allowAsStatement: true }],
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          // For Vite virtual module
          '^virtual:',
        ],
      },
    ],
    // Import sorting with "simple-import-sort"
    // Preferred over 'import/order`
    // See: https://github.com/lydell/eslint-plugin-simple-import-sort#how-is-this-rule-different-from-importorder
    'sort-imports': 'off',
    'import/order': 'off',
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
