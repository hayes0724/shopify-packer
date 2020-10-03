const {list, create, remove} = require('./api');

const themeKit = require('@shopify/themekit');

const Environment = require('../utilities/enviroment');

const table = require('table').table;
const chalk = require('chalk');

const paths = require('../utilities/paths').config;

const ora = require('ora');

const clearConsole = require('../utilities/clear-console');

const Manager = require('./config-manager');

const manager = new Manager();

module.exports.getThemes = async (args) => {
  const themes = await list();
  const parsed = _parseThemes(themes);
  console.log(table(parsed));
};

module.exports.create = async (args) => {
  clearConsole();
  const spinner = ora(chalk.magenta(`'Creating new theme: ${args.name} ...'`));
  spinner.start();
  if (!args.name) {
    spinner.fail(chalk.red('Theme name is required'));
  }
  const result = await create(args);
  const parsed = _parseThemes([result.theme]);
  manager.setId(result.theme.id.toString());
  spinner.succeed(
    `Theme ${chalk.cyan(result.theme.name)} with id ${chalk.cyan(
      result.theme.id
    )} created and config.json updated!`
  );
  console.log(table(parsed));
};

module.exports.remove = async (args) => {
  clearConsole();
  const spinner = ora(
    chalk.magenta(
      `'Deleting theme for environment: ${Environment.getEnvNameValue()} ...'`
    )
  );
  spinner.start();
  const result = await remove(args);
  if (result.status === 'error') {
    spinner.color = 'red';
    spinner.fail(chalk.red(result.message));
  } else {
    manager.setId('');
    spinner.succeed(
      `Theme ${chalk.cyan(result.name)} with id ${chalk.cyan(
        result.id
      )} was deleted`
    );
  }
};

module.exports.download = async (args) => {
  return await themeKit.command(
    'download',
    {
      password: Environment.getPasswordValue(),
      themeid: Environment.getThemeIdValue(),
      store: Environment.getStoreValue(),
      env: Environment.getEnvNameValue(),
      ignoredFiles: Environment.getIgnoreFilesValue().split(':'),
    },
    {
      cwd: paths.theme.src.root,
    }
  );
};

const _parseThemes = (themes) => {
  const exclude = [5, 6, 7, 8];
  const headers = [];
  const data = [];
  themes.forEach((theme) => {
    const row = [];
    for (const [key, value] of Object.entries(theme)) {
      if (theme.role === 'main') {
        row.push(chalk.cyanBright.bold(value));
      } else {
        row.push(chalk.green(value));
      }
    }
    data.push(_excludeByIndex(row, exclude));
  });
  for (const [key, value] of Object.entries(themes[0])) {
    headers.push(chalk.bold.whiteBright(key.toUpperCase().replace('_', ' ')));
  }
  return [_excludeByIndex(headers, exclude), ...data];
};

const _excludeByIndex = (array, values) => {
  return array.filter((item, index) => {
    return !values.includes(index);
  });
};

const _updateConfig = () => {};
