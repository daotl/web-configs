# Config for web development tools for DAOT projects

This monorepo includes packages for:
- `tsconfig.json` for TypeScript
- `biome.json` for Biome
-  ESLint configs
- `dprint.json` for dprint
- Prettier config

## Installation

`tsconfig.json`:
```shell
npm install -D @daotl/tsconfig
```

Biome config (`biome.json`):
```
npm install -D @daotl/biome-config
```

ESLint config (including dprint config):
```shell
npm install -D @daotl/eslint-config
```

dprint config (using without ESLint):
```shell
npm instasll -D @daotl/dprint-config
```

Prettier config (deprecated):
```shell
npm install -D @daotl/prettier-config
```

## Usage

### Using tsconfig.json

Extend the provided config in `tsconfig.json`:

```json
{
  "extends": "@daotl/tsconfig/xxx.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

Replace `xxx` with one of `node`, `browser` or `vue`.

### Using Biome config

Run in the project root:

```sh
npx gen-biome-json
```

If you want to extend the default config (e.x., for adding `files.ignore` field), create a `biome.ext.json` in the project root like this before running the above step:

```json
{
  "files": {
    "ignore": ["dist"]
  }
}
```

### Using ESLint config

`eslint.config.js`:

```js
import config from '@daotl/eslint-config'

export default [
  ...config({
    // typescript: true, // Will auto detect
    // browser: true,
    // vue: true, // Will auto detect
  }),
  {
    // Extend with your config ...
  }
]
```

See [@antfu/eslint-config](https://github.com/antfu/eslint-config#customization) for more options.

### Using dprint config without ESLint

Add the `extends` field in your `dprint.json` config file:

```json
{
  "extends": ["./node_modules/@daotl/dprint-config/dist/dprint.json"]
}
```

### Using Prettier config (deprecated)

Reference `@daotl/web-config/prettier` in your `package.json`:

```json
{
  "name": "my-cool-library",
  "version": "9000.0.1",
  "prettier": "@daotl/prettier-config"
}
```

Or you can extend the provided Prettier config in `.prettierrc.js`:

```javascript
module.exports = {
  ...require("@daotl/prettier-configs"),
  // your custom options
}
```

## References

- [Prettier - Sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)
- [ESLint - Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)

## License

[MIT](LICENSE) © DAOT Labs.
