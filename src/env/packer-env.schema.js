const commonPaths = require('../config/common-paths');

module.exports = {
  ...commonPaths,

  // The environment variable key which contains the name of the environment
  // Packer is running in
  'env.keys.name': 'ENV_NAME',

  // The environment variable key which contains the myshopify.com URL to your
  // Shopify store
  'env.keys.store': 'PACKER_STORE',

  // The environment variable key which contains the API password generated from
  // a Private App
  'env.keys.password': 'PACKER_PASSWORD',

  // The environment variable key which contains the ID of the theme you wish to
  // upload files to
  'env.keys.id': 'PACKER_ID',

  // The environment variable key which contains a list of file patterns to
  // ignore, with each list item separated by ':'
  'env.keys.ignore': 'PACKER_IGNORE',
};
