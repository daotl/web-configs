const tsOverrides = require('./tsOverrides')
const finalOverrides = require('./finalOverrides')

module.exports = {
  extends: ['./browser-base'],
  overrides: [
    tsOverrides.general(),
    tsOverrides.typeChecking(),
    ...finalOverrides,
  ],
}
