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

      // Always use main product template script file for duplicated product templates
      // it is a feature required on some projects
      // override as default product script
      if (config.get('build.baseProductModule') && name.startsWith(`product.`)) {
        const jsProductBaseFile = path.join(
          config.get('theme.src.scripts'),
          'templates',
          'product.js',
        );
        entrypoints[`template.${name}`] = jsProductBaseFile;
      }

      // Always use main collection template script file for duplicated collection templates
      // it is a feature required on some projects
      // override as default collection script
      if (config.get('build.baseCollectionModule') && name.startsWith(`collection.`)) {
        const jsCollectionBaseFile = path.join(
          config.get('theme.src.scripts'),
          'templates',
          'collection.js',
        );
        entrypoints[`template.${name}`] = jsCollectionBaseFile;
      }
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
