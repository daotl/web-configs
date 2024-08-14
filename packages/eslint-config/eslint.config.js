// eslint-disable-next-line antfu/no-import-dist
import { config } from './dist/index.js'

export default config(
  {
    typescript: true,
    browser: true,
    vue: true,
  },
  {
    files: ['**/*.ts'],
    rules: {
      'ts/no-non-null-assertion': 'error',
    },
  },
)
