const fs = require('fs');
const execSync = require('child_process').execSync;
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

function eslint({fix} = {}) {
  const executable = config.get('eslint.bin');
  const extensions = ['--ext .js'];
  const fixFlag = fix ? '--fix' : '';
  const eslintConfig = `--config ${config.get('eslint.schema')}`;
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
    console.error(error);
  }
};

module.exports.runEslintFix = function runEslintFix() {
  console.log('\n Linting script files and fixing...');
  try {
    eslint({fix: true});
  } catch (error) {
    console.error(error);
  }
};
