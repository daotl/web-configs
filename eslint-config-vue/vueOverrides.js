const antfu = require('@antfu/eslint-config-vue')

module.exports = [
  {
    files: ['*.vue'],
    extends: ['plugin:vue/vue3-recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      extraFileExtensions: ['.vue'],
    },
    rules: {
      // Disabled for Vue <script setup>
      'no-undef': 'off',
      // Disabled for <script setup lang="ts">
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['*.vue', '*.jsx', '*.tsx'],
    rules: antfu.rules,
  },
  {
    files: ['*.mdx'],
    extends: ['plugin:mdx/recommended'],
  },
]
