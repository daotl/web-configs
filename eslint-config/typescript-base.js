const tsOverride = require('./tsOverride')
const finalOverrides = require('./finalOverrides')

module.exports = {
  extends: ['./base'],
  overrides: [tsOverride, ...finalOverrides],
}
