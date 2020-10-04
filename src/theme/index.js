const themeKit = require('@shopify/themekit');
const table = require('table').table;
const chalk = require('chalk');
const ora = require('ora');

const PackerConfig = require('../config');
const clearConsole = require('../utilities/clear-console');
const {
  getEnvNameValue,
  getPasswordValue,
  getThemeIdValue,
  getStoreValue,
  getIgnoreFilesValue,
} = require('../env');
const config = new PackerConfig(require('../../packer.schema'));

const {list, create, remove} = require('./api');

const _excludeByIndex = (array, values) => {
  return array.filter((item, index) => {
    return !values.includes(index);
  });
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

const getThemes = async () => {
  const themes = await list();
  const parsed = _parseThemes(themes);
  console.log(table(parsed));
};

const createTheme = async (args) => {
  clearConsole();
  const spinner = ora(chalk.magenta(`'Creating new theme: ${args.name} ...'`));
  spinner.start();
  if (!args.name) {
    spinner.fail(chalk.red('Theme name is required'));
  }
  const result = await create(args);
  const parsed = _parseThemes([result.theme]);
  // manager.setId(result.theme.id.toString());
  spinner.succeed(
    `Theme ${chalk.cyan(result.theme.name)} with id ${chalk.cyan(
      result.theme.id
    )} created and config.json updated!`
  );
  console.log(table(parsed));
};

const removeTheme = async () => {
  clearConsole();
  const spinner = ora(
    chalk.magenta(`'Deleting theme for environment: ${getEnvNameValue()} ...'`)
  );
  spinner.start();
  const result = await remove();
  if (result.status === 'error') {
    spinner.color = 'red';
    spinner.fail(chalk.red(result.message));
  } else {
    // manager.setId('');
    spinner.succeed(
      `Theme ${chalk.cyan(result.name)} with id ${chalk.cyan(
        result.id
      )} was deleted`
    );
  }
};

const downloadTheme = async () => {
  // @TODO: add warning message if directory is not empty
  await themeKit.command(
    'download',
    {
      password: getPasswordValue(),
      themeid: getThemeIdValue(),
      store: getStoreValue(),
      env: getEnvNameValue(),
      ignoredFiles: getIgnoreFilesValue(),
    },
    {
      cwd: config.get('theme.src.root'),
    }
  );
};

module.exports = {
  downloadTheme,
  removeTheme,
  createTheme,
  getThemes,
};
