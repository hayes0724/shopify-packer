const chalk = require('chalk');

const {deploy, replace} = require('../../src/server/sync');
const promptContinueIfPublishedTheme = require('../../src/server/prompts/continue-if-published-theme');
const {getThemeIdValue, assign} = require('../../src/env');

module.exports = (args) => {
  assign(args.env);
  promptContinueIfPublishedTheme(getThemeIdValue())
    .then((answer) => {
      if (!answer) {
        process.exit(0);
      }
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
