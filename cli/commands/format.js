const {runEslintFix} = require('../../src/linters/eslint');
const {runStylelintFix} = require('../../src/linters/stylelint');
const {runPrettierJson} = require('../../src/linters/prettier');

module.exports = (args) => {
  const {scripts, styles, json} = args;
  const runAll =
    typeof scripts === 'undefined' &&
    typeof styles === 'undefined' &&
    typeof json === 'undefined';

  if (scripts || runAll) {
    runEslintFix();
  }

  if (styles || runAll) {
    runStylelintFix();
  }

  if (json || runAll) {
    runPrettierJson();
  }
};
