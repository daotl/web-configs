import type { OptionsConfig } from '@antfu/eslint-config'

export type Config = OptionsConfig & {
  /**
   * Enable configs for browser environments, automatically enabled if `vue` is set to `true`.
   */
  browser?: boolean
}
