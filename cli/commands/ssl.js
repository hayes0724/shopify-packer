const {checkSSL, validate} = require('../../src/server/ssl');

module.exports = (args) => {
  if (args.check) {
    validate();
  }
  if (args.make) {
    checkSSL();
  }
};
