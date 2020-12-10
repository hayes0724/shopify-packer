const chalk = require('chalk');

const {deploy, replace} = require('../../src/server/sync');
const promptContinueIfPublishedTheme = require('../../src/server/prompts/continue-if-published-theme');
const {
  getThemeIdValue,
  getAllowLiveValue,
  setAllowLiveValue,
  assign,
} = require('../../src/env');

module.exports = async (args) => {
  assign(args.env);
  await promptContinueIfPublishedTheme(getThemeIdValue(), getAllowLiveValue())
    .then((answer) => {
      if (!answer) {
        process.exit(0);
      }
      setAllowLiveValue('true');
      if (args.nodelete) {
        return deploy();
      }
      return replace();
    })
    .then(() => {
      return console.log(chalk.green('\nFiles overwritten successfully!\n'));
    })
    .catch((error) => {
      console.log(`\n${chalk.red(error)}\n`);
    });
};
