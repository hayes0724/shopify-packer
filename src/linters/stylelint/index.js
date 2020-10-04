const fs = require('fs');
const execSync = require('child_process').execSync;

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const chalk = require('chalk');

function stylelint({fix} = {}) {
  const executable = config.get('stylelint.bin');
  const fixFlag = fix ? '--fix' : '';
  const glob = `./**/*.{${['css', 'scss', 'sass'].join(',')}}`;
  const stylelintConfig = `--config ${config.get('stylelint.config')}`;
  const ignorePath = fs.existsSync(config.get('stylelint.ignore'))
    ? `--ignore-path ${config.get('stylelint.ignore')}`
    : '';

  execSync(
    `${JSON.stringify(
      executable
    )} "${glob}" ${stylelintConfig} ${fixFlag} ${ignorePath}`,
    {
      stdio: 'inherit',
    }
  );
}

module.exports.stylelint = stylelint;

module.exports.runStylelint = function runStylelint() {
  console.log('Linting style files...\n');
  try {
    stylelint();
  } catch (error) {
    console.log(chalk.red('StyleLint errors found.'));
  }
};

module.exports.runStylelintFix = function runStylelintFix() {
  console.log('Linting style files and fixing...\n');
  try {
    stylelint({fix: true});
  } catch (error) {
    console.log(chalk.red('StyleLint errors found.'));
  }
};
