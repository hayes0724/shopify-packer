const {checkSSL, validate} = require('../../src/server/ssl');

module.exports = async (args) => {
  if (args.check) {
    validate();
  }
  if (args.make) {
    await checkSSL();
  }
};
