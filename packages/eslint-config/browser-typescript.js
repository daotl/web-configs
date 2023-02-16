module.exports = {
  extends: ['./browser-typescript-base', 'plugin:@phaphoso/dprint/disable-conflict-rules'],
  overrides: require('./finalOverrides'),
}
