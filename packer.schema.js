const path = require('path');
const commonPaths = require('./src/config/common-paths');

module.exports = {
  ...commonPaths,
  entrypoints: {},
  'network.ipAddress': '',
  'network.external': '',
  'network.interface': '',
};
