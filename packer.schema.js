const commonPaths = require('./src/config/common-paths');

module.exports = {
  ...commonPaths,
  entrypoints: {},
  'network.ip': '',
  'network.external': '',
  'network.interface': '',
  'network.reload': 0,
};
