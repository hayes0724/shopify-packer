const fs = require('fs');
const path = require('path');

const PackerConfig = require('../config');
const config = new PackerConfig(require('../../packer.schema'));

module.exports = function () {
  const entrypoints = {};

  fs.readdirSync(config.get('theme.src.layout')).forEach((file) => {
    const name = path.parse(file).name;
    const jsFile = path.join(
      config.get('theme.src.scripts'),
      'layout',
      `${name}.js`
    );
    if (fs.existsSync(jsFile)) {
      entrypoints[`layout.${name}`] = jsFile;
    }
  });
  return entrypoints;
};
