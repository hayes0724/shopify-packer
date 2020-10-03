const fs = require('fs');
const execSync = require('child_process').execSync;

const paths = require('../../utilities/paths').config;

const chalk = require('chalk');

function stylelint({fix} = {}) {
  const executable = paths.stylelint.bin;
  const fixFlag = fix ? '--fix' : '';
  const glob = `./**/*.{${['css', 'scss', 'sass'].join(',')}}`;
  const stylelintConfig = `--config ${paths.stylelint.config}`;
  const ignorePath = fs.existsSync(paths.stylelint.ignore)
    ? `--ignore-path ${paths.stylelint.ignore}`
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
