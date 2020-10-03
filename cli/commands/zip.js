const fs = require('fs');
const path = require('path');

const archiver = require('archiver');
const chalk = require('chalk');

const paths = require('../../src/utilities/paths').config;

module.exports = (args) => {
  const zipName = fs.existsSync(paths.theme.packageJson)
    ? require(paths.theme.packageJson).name
    : 'theme-zip';
  const zipPath = getZipPath(paths.theme.root, zipName, 'zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip');

  if (!fs.existsSync(paths.theme.dist.root)) {
    console.log(
      chalk.red(
        `${paths.theme.dist.root} was not found. \n` +
          'Please run the Packer Build script before running Packer Zip'
      )
    );

    process.exit();
  }

  output.on('close', () => {
    console.log(`${path.basename(zipPath)}: ${archive.pointer()} total bytes`);
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.log(err);
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(paths.theme.dist.root, '/');
  archive.finalize();
};

function getZipPath(dir, name, ext) {
  const proposedPath = path.resolve(dir, `${name}.${ext}`);
  if (!fs.existsSync(proposedPath)) {
    return proposedPath;
  }

  for (let i = 1; ; i++) {
    const tryPath = path.resolve(dir, `${name} (${i}).${ext}`);

    if (!fs.existsSync(tryPath)) {
      return tryPath;
    }
  }
}
