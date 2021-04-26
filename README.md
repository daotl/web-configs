# ESLint configs for DAOT projects

## Provided ESLint configs

- `@daotl/eslint-config` for general JavaScript projects
- `@daotl/eslint-config/browser` for JavaScript projects targeting browsers
- `@daotl/eslint-config/typescript` for general TypeScript projects
- `@daotl/eslint-config/browser-typescript` for JavaScript projects targeting browsers

## Usage

### Using Prettier config
 
Reference `@daotl/web-style-config/prettier` in your `package.json`:

```json
{
  "name": "my-cool-library",
  "version": "9000.0.1",
  "prettier": "@daotl/web-style-config/prettier"
}
```

Or you can extend the provided Prettier config in `.prettierrc.js`:

```javascript
module.exports = {
  ...require("@daotl/web-style-configs/prettier"),
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

## References

- [Prettier - Sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)
- [ESLint - Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)
