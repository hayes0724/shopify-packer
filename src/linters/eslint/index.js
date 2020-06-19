const fs = require('fs');
const execSync = require('child_process').execSync;
const paths = require('../../utilities/paths').config;
const chalk = require('chalk');

function eslint({fix} = {}) {
  const executable = paths.eslint.bin;
  const extensions = ['--ext .js'];
  const fixFlag = fix ? '--fix' : '';
  const eslintConfig = `--config ${paths.eslint.config}`;
  const ignorePath = fs.existsSync(paths.eslint.ignore)
    ? `--ignore-path ${paths.eslint.ignore}`
    : '';

  execSync(
    // prettier-ignore
    `${JSON.stringify(executable)} . ${extensions} ${ignorePath} ${eslintConfig}` +
    ` ${fixFlag} --max-warnings 0 `,
    {stdio: 'inherit'},
  );
}

module.exports.eslint = eslint;

module.exports.runEslint = function runEslint() {
  console.log('Linting script files...\n');
  try {
    eslint();
  } catch (error) {
    console.log(chalk.red('ESLint errors found.'));
  }
};

module.exports.runEslintFix = function runEslintFix() {
  try {
    eslint({fix: true});
  } catch (error) {
      console.log(chalk.red('ESLint errors found.'));
  }
};
