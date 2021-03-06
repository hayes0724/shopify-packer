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
  const allowLive = args.allowLive || getAllowLiveValue();
  await promptContinueIfPublishedTheme(getThemeIdValue(), allowLive)
    .then((answer) => {
      if (!answer) {
        throw Error(
          'This is a live theme! Try adding the live setting to your theme config'
        );
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
