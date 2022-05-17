const tsOverrides = require('./tsOverrides')

module.exports = {
  extends: ['./browser-base'],
  overrides: tsOverrides(),
}
