const execSync = require('child_process').execSync;

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

function themelint() {
  const executable = config.get('themelint.bin');
  const dir = config.get('theme.src.root');

  execSync(`${JSON.stringify(executable)} ${dir}`, {
    stdio: 'inherit',
  });
}

module.exports.themelint = themelint;

module.exports.runThemelint = function runThemelint() {
  console.log('Linting locales...');

  try {
    return themelint();
  } catch (error) {
    throw error;
  }
};
