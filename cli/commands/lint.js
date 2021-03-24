const {runEslint} = require('../../src/linters/eslint');
const {runStylelint} = require('../../src/linters/stylelint');

module.exports = (args) => {
  const {scripts, styles} = args;
  const runAll =
    typeof scripts === 'undefined' && typeof styles === 'undefined';

  if (scripts || runAll) {
    runEslint();
  }

  if (styles || runAll) {
    runStylelint();
  }
};
