const fs = require('fs');
const execSync = require('child_process').execSync;

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const chalk = require('chalk');

function eslint({fix} = {}) {
  const executable = config.get('eslint.bin');
  const extensions = ['--ext .js'];
  const fixFlag = fix ? '--fix' : '';
  const eslintConfig = `--config ${config.get('eslint.config')}`;
  const ignorePath = fs.existsSync(config.get('eslint.ignore'))
    ? `--ignore-path ${config.get('eslint.ignore')}`
    : '';

  execSync(
    // prettier-ignore
    `${JSON.stringify(executable)} . ${extensions} ${ignorePath} ${eslintConfig}` +
    ` ${fixFlag} --max-warnings 0 `,
    {stdio: 'inherit'}
  );
}

module.exports.eslint = eslint;

module.exports.runEslint = function runEslint() {
  console.log('\n Linting script files...');
  try {
    eslint();
  } catch (error) {
    console.log(chalk.red('ESLint errors found.'));
  }
};

module.exports.runEslintFix = function runEslintFix() {
  console.log('\n Linting script files and fixing...');
  try {
    eslint({fix: true});
  } catch (error) {
    console.log(chalk.red('ESLint errors found.'));
  }
};
