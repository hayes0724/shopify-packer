const fs = require('fs');
const {exec} = require('child_process');
const {promisify} = require('util');

const paths = require('../../utilities/paths').config;

async function prettier({scripts, styles, json} = {}) {
  const executable = paths.prettier.bin;
  const prettierConfig = `--config ${paths.prettier.config}`;
  const ignorePath = fs.existsSync(paths.prettier.ignore)
    ? `--ignore-path ${paths.prettier.ignore}`
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
