module.exports = {
  extends: [
    '@daotl/eslint-config/typescript-base',
    './base',
    '@vue/typescript/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'vue'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        // Disable for Vue <script setup>
        'no-undef': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
}
