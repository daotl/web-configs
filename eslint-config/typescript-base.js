const tsOverrides = require('./tsOverrides')

module.exports = {
  extends: ['./base'],
  overrides: tsOverrides(),
}
