const chalk = require('chalk');

const {
  getThemes,
  createTheme,
  removeTheme,
  downloadTheme,
} = require('../../src/theme');
const {assign} = require('../../src/env');

module.exports = async (args) => {
  assign(args.env);
  if (args.list) {
    await getThemes();
  }
  if (args.create) {
    await createTheme(args);
  }
  if (args.remove) {
    await removeTheme(args);
  }
  if (args.download) {
    await downloadTheme()
      .then(() => {
        console.log(chalk.green('Theme downloaded!'));
      })
      .catch((err) => {
        console.log(chalk.red('Error downloading files\n'));
        console.log(chalk.red(err));
      });
  }
};
