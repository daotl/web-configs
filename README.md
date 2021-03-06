# tsconfig.json and ESLint/Prettier configs for DAOT projects

## Provided ESLint configs

- `@daotl/eslint-config` for general JavaScript projects
- `@daotl/eslint-config/browser` for JavaScript projects targeting browsers
- `@daotl/eslint-config/typescript` for general TypeScript projects
- `@daotl/eslint-config/browser-typescript` for JavaScript projects targeting browsers
- `@daotl/eslint-config-vue` for Vue with JavaScript
- `@daotl/eslint-config-vue/typescript` for Vue with TypeScript

## Installation

tsconfig.json:
```shell
npm install -D @daotl/tsconfig
```

ESLint config (including Prettier config):
```shell
npm install -D @daotl/eslint-config
```

Prettier config without ESLint:
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

### Using Prettier config
 
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

### Using ESLint config 

> **NOTES**: This requires [Using Prettier config](#using-prettier-config) first.

Add the `extends` filed in your ESLint config file:

```json
{
  "extends": "@daotl/eslint-config[/xxx]"
}
```

Omit `/xxx` for general JavaScript projects or replace `xxx` with one of `browser`, `typescript` or `bowser-typescript`, see [Provided ESLint configs](#provided-eslint-configs).

For Vue project, use:

```json
{
  "extends": "@daotl/eslint-config-vue[/typescript]"
}
```

## References

- [Prettier - Sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)
- [ESLint - Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)

## License

[MIT](LICENSE) ?? DAOT Labs.
