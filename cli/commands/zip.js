const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const PackerConfig = require('../../src/config');
const config = new PackerConfig(require('../../packer.schema'));

module.exports = () => {
  const zipName = fs.existsSync(config.get('package'))
    ? require(config.get('package')).name
    : 'theme-zip';
  const zipPath = getZipPath(config.get('root'), zipName, 'zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip');

  if (!fs.existsSync(config.get('theme.dist.root'))) {
    throw Error(
      `${config.get('theme.dist.root')} was not found. \n` +
        'Please run the Packer Build script before running Packer Zip'
    );
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
  archive.directory(config.get('theme.dist.root'), '/');
  archive
    .finalize()
    .then(() =>
      console.log(
        `Theme has been zipped to this location: ${config.get(
          'theme.dist.root'
        )}`
      )
    );
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
