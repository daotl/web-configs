/**
 * @param {string[]} extraExtensions - ['.mdx', '.vue']
 */
module.exports = (extraExtensions = []) => [
  // Theses also works for .vue, .mdx, etc.
  {
    files: ['*.ts', '*.tsx', '*.d.ts'].concat(
      extraExtensions.map((ext) => `*${ext}`),
    ),
    extends: [
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['eslint-plugin-tsdoc'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      extraFileExtensions: extraExtensions,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'].concat(
            extraExtensions,
          ),
        },
        typescript: {
          // https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
        },
      },
    },
    rules: {
      /* Below from @antfu/eslint-config-ts/index.js */
      // https://github.com/antfu/eslint-config/blob/d463449db4e1e77bc4acad5064554198309a2125/packages/typescript/index.js
      'import/named': 'off',

      // TS
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description' },
      ],
      '@typescript-eslint/member-delimiter-style': [
        'error',
        { multiline: { delimiter: 'none' } },
      ],
      '@typescript-eslint/type-annotation-spacing': ['error', {}],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      // Sometimes using `type x = {}` is necessary
      // Issue with interface: https://stackoverflow.com/questions/63617344/how-to-satisfy-the-constraint-of-recordstring-unknown-with-interface
      // '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/prefer-ts-expect-error': 'error',

      // Override JS
      'no-useless-constructor': 'off',
      indent: 'off',
      '@typescript-eslint/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false,
          ignoredNodes: [
            'TemplateLiteral *',
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
            'TSTypeParameterInstantiation',
          ],
          offsetTernaryExpressions: true,
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: true },
      ],
      'brace-style': 'off',
      '@typescript-eslint/brace-style': [
        'error',
        'stroustrup',
        { allowSingleLine: true },
      ],
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': 'off',
      '@typescript-eslint/object-curly-spacing': ['error', 'always'],
      semi: 'off',
      '@typescript-eslint/semi': ['error', 'never'],
      quotes: 'off',
      '@typescript-eslint/quotes': ['error', 'single'],
      'space-before-blocks': 'off',
      '@typescript-eslint/space-before-blocks': ['error', 'always'],
      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-infix-ops': 'off',
      '@typescript-eslint/space-infix-ops': 'error',
      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': [
        'error',
        { before: true, after: true },
      ],
      'comma-spacing': 'off',
      '@typescript-eslint/comma-spacing': [
        'error',
        { before: false, after: true },
      ],
      'no-extra-parens': 'off',
      '@typescript-eslint/no-extra-parens': ['error', 'functions'],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': 'error',
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      // The following rule overrides require a parser service, aka. require a `typescript.json` path.
      // This needs to be done individually for each project, and it slows down linting significantly.
      // 'no-throw-literal': 'off',
      // '@typescript-eslint/no-throw-literal': 'error',
      // 'no-implied-eval': 'off',
      // '@typescript-eslint/no-implied-eval': 'error',

      // off
      // '@typescript-eslint/naming-convention': 'off',
      // '@typescript-eslint/explicit-function-return-type': 'off',
      // '@typescript-eslint/explicit-member-accessibility': 'off',
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/parameter-properties': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/ban-types': 'off',
      // '@typescript-eslint/no-namespace': 'off',

      /* Above from @antfu/eslint-config-ts/index.js */

      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowedNames: [],
        },
      ],

      // TypeScript already checks this: https://stackoverflow.com/a/67018836
      'no-undef': 'off',
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
      '@typescript-eslint/no-inferrable-types': 'off',

      'tsdoc/syntax': 'warn',
    },
  },

  // These works for .vue, but don't not .mdx or code in .md files
  {
    files: ['*.ts', '*.tsx', '.d.ts'].concat(
      extraExtensions.map((ext) => `*${ext}`),
    ),
    excludedFiles: ['*.mdx', '**/*.md/*.{ts,tsx,d.ts}'],
    extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
    rules: {
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': [
        'error',
        { allowIndexSignaturePropertyAccess: true },
      ],
      // TS strict rules
      '@typescript-eslint/prefer-return-this-type': 'error',
    },
  },
]
