import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'

export type Config = OptionsConfig &
  TypedFlatConfigItem & {
    /**
     * Enable configs for browser environments, automatically enabled if `vue` is set to `true`.
     */
    browser?: boolean
  }
