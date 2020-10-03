const table = require('table').table;
const figlet = require('figlet');
const chalk = require('chalk');

const version = require('../../package').version;

module.exports = () => {
  const headers = [
    chalk.whiteBright('Command'),
    chalk.whiteBright('Description'),
    chalk.whiteBright('Flags'),
  ];
  const commands = [];

  console.log(
    chalk.cyanBright(
      figlet.textSync('PACKER', {
        font: 'Varsity',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  console.log(chalk.green(`Shopify Packer - v${version}`));
  commands.push([
    chalk.greenBright.bold('init <dir>'),
    'Creates a blank start theme in specified directory.',
    '--repo',
  ]);
  commands.push([
    chalk.greenBright.bold('start'),
    'Compiles your local theme files into a dist directory, uploads these \n' +
      'files to your remote Shopify store and finally boots up a local Express\n' +
      'server that will serve most of your CSS and JavaScript.',
    `--env=my-custom-env-name
--skipPrompts
--skipFirstDeploy`,
  ]);
  commands.push([
    chalk.greenBright.bold('watch'),
    'Runs start command with skip first deploy flag.',
    `--env=my-custom-env-name
--skipPrompts
`,
  ]);
  commands.push([
    chalk.greenBright.bold('build'),
    'Builds a production-ready version of the theme by compiling the files into the dist folder.',
    '--analyze',
  ]);
  commands.push([
    chalk.greenBright.bold('lint'),
    'Lints the theme code according to the rules declared in the .eslintrc and .stylelintrc files.\n' +
      'By default, it uses ESLint to lint JS files, Stylelint to lint CSS files',
    `--scripts
--styles
--locales`,
  ]);
  commands.push([
    chalk.greenBright.bold('format'),
    'Formats the theme code according to the rules declared in the .eslintrc and .stylelintrc files.\n' +
      'By default, it uses ESLint Fix to format JS files, Stylelint Fix to format CSS files\n' +
      'and Prettier to format JSON files.',
    `--scripts
--styles
--locales`,
  ]);
  commands.push([
    chalk.greenBright.bold('deploy'),
    'Uploads the dist folder to the Shopify store.',
    `--env=my-custom-env-name
--skipPrompts
--nodelete`,
  ]);
  commands.push([
    chalk.greenBright.bold('zip'),
    'Compiles the contents of the dist directory and creates a ZIP file in the root of the project.',
    '',
  ]);
  commands.push([
    chalk.greenBright.bold('theme:list'),
    'Lists all themes on the store using credentials in config.json',
    '--env=my-custom-env-name',
  ]);
  commands.push([
    chalk.greenBright.bold('theme:create'),
    'Create a new theme using credentials in config.json, it will add the store id to your config',
    `--env=my-custom-env-name
--name=my-theme-name
--deploy`,
  ]);
  commands.push([
    chalk.greenBright.bold('theme:remove'),
    'Completely deletes the theme using the id set in config.json',
    '--env=my-custom-env-name\n',
  ]);
  commands.push([
    chalk.greenBright.bold('theme:download'),
    'Download theme files from shopify',
    '--settings\n',
  ]);
  commands.push([
    chalk.greenBright.bold('--version | -v'),
    'Show packer version',
    '',
  ]);
  console.log(table([headers, ...commands]));
};
