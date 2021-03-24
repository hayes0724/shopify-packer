const fs = require('fs');
const execSync = require('child_process').execSync;
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

function stylelint({fix} = {}) {
  const executable = config.get('stylelint.bin');
  const fixFlag = fix ? '--fix' : '';
  const glob = `./**/*.{${['css', 'scss', 'sass'].join(',')}}`;
  const stylelintConfig = `--config ${config.get('stylelint.schema')}`;
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
  console.log('\n Linting style files...');
  try {
    stylelint();
  } catch (error) {
    console.error(error);
  }
};

module.exports.runStylelintFix = function runStylelintFix() {
  console.log('\n Linting style files and fixing...');
  try {
    stylelint({fix: true});
  } catch (error) {
    console.error(error);
  }
};
