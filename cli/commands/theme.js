const chalk = require('chalk');

const {getThemes, create, remove, download} = require('../../src/theme');
const Environment = require('../../src/utilities/enviroment');

module.exports = async (args) => {
  const env = new Environment(args.env);
  if (args.list) {
    await getThemes(args);
  }
  if (args.create) {
    await create(args);
  }
  if (args.remove) {
    await remove(args);
  }
  if (args.download) {
    download(args)
      .then((result) => {
        console.log(chalk.green('Theme downloaded!'));
      })
      .catch((e) => {
        console.log(chalk.red('Error downloading files\n'));
        console.log(chalk.red(e));
      });
  }
};
