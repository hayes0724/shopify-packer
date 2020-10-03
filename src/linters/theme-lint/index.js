const execSync = require('child_process').execSync;

const paths = require('../../utilities/paths').config;

function themelint() {
  const executable = paths.themelint.bin;
  const dir = paths.theme.src.root;

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
