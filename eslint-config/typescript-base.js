const tsOverrides = require('./tsOverrides')
const finalOverrides = require('./finalOverrides')

module.exports = {
  extends: ['./base'],
  overrides: [...tsOverrides(), ...finalOverrides],
}
