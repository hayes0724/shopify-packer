const fs = require('fs');
const {exec} = require('child_process');
const {promisify} = require('util');

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

async function prettier({scripts, styles, json} = {}) {
  const executable = config.get('prettier.bin');
  const prettierConfig = `--config ${config.get('prettier.config')}`;
  const ignorePath = fs.existsSync(config.get('prettier.ignore'))
    ? `--ignore-path ${config.get('prettier.ignore')}`
    : '';
  const extensions = [
    ...(scripts ? ['js'] : []),
    ...(styles ? ['css', 'scss', 'sass'] : []),
    ...(json ? ['json'] : []),
  ];
  const glob =
    extensions.length > 1
      ? `./**/*.{${extensions.join(',')}}`
      : `./**/*.${extensions.join(',')}`;

  try {
    await promisify(exec)(
      `${JSON.stringify(
        executable
      )} "${glob}" --write ${prettierConfig} ${ignorePath}`
    );
  } catch (error) {
    if (typeof error.stdout !== 'string') {
      throw error;
    }
  }
}

module.exports.prettier = prettier;

module.exports.runPrettierJson = function runPrettierJson() {
  try {
    return prettier({json: true});
  } catch (error) {
    throw error;
  }
};
