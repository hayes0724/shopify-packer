const {runEslint} = require('../../src/linters/eslint');
const {runStylelint} = require('../../src/linters/stylelint');
const {runThemelint} = require('../../src/linters/theme-lint');

module.exports = (args) => {
    const {scripts, styles, locales} = args;
    const runAll =
        typeof scripts === 'undefined' &&
        typeof styles === 'undefined' &&
        typeof locales === 'undefined';

    if (scripts || runAll) {
        runEslint();
    }

    if (styles || runAll) {
        runStylelint();
    }

    if (locales || runAll) {
        runThemelint();
    }

}