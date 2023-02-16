module.exports = {
  extends: ['./browser-base', 'plugin:@phaphoso/dprint/disable-conflict-rules'],
  overrides: require('./finalOverrides'),
}
