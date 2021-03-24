const {makeCert} = require('../../src/server/ssl');

module.exports = (args) => {
  if (args.check) {
    //
  }
  if (args.make) {
    makeCert(args);
  }
};
