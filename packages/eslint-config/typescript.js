module.exports = {
  extends: ['./typescript-base', 'plugin:@phaphoso/dprint/disable-conflict-rules'],
  overrides: require('./finalOverrides'),
}
