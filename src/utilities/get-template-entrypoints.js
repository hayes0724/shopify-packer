const fs = require('fs');
const path = require('path');

const PackerConfig = require('../config');
const config = new PackerConfig(require('../../packer.schema'));

const VALID_LIQUID_TEMPLATES = [
  '404',
  'article',
  'blog',
  'cart',
  'collection',
  'account',
  'activate_account',
  'addresses',
  'login',
  'order',
  'register',
  'reset_password',
  'gift_card',
  'index',
  'list-collections',
  'page',
  'password',
  'product',
  'search',
];

function isValidTemplate(filename) {
  const name = VALID_LIQUID_TEMPLATES.filter((template) =>
    filename.startsWith(`${template}.`)
  );
  return Boolean(name);
}

module.exports = function () {
  const entrypoints = {};
  fs.readdirSync(config.get('theme.src.templates')).forEach((file) => {
    const name = path.parse(file).name;
    const jsFile = path.join(
      config.get('theme.src.scripts'),
      'templates',
      `${name}.js`
    );

    if (isValidTemplate(name) && fs.existsSync(jsFile)) {
      entrypoints[`template.${name}`] = jsFile;
    }
  });

  fs.readdirSync(config.get('theme.src.customers')).forEach((file) => {
    const name = `${path.parse(file).name}`;
    const jsFile = path.join(
      config.get('theme.src.scripts'),
      'templates',
      'customers',
      `${name}.js`
    );

    if (isValidTemplate(name) && fs.existsSync(jsFile)) {
      entrypoints[`template.${name}`] = jsFile;
    }
  });

  return entrypoints;
};
