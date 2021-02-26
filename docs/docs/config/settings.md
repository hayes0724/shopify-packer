---
id: settings
title: App settings
sidebar_label: App settings
slug: /config/settings
---

Packer app configuration settings are located in ``packer.config.js``. You can modify any setting from the package without having to edit the source:

Any value from these files can be overridden:
1. [packer-env.schema.js](https://github.com/hayes0724/shopify-packer/blob/master/src/env/packer-env.schema.js) - environment values
2. [common-paths.js](https://github.com/hayes0724/shopify-packer/blob/master/src/config/common-paths.js) - path settings
2. [packer.schema.js](https://github.com/hayes0724/shopify-packer/blob/master/packer.schema.js) - app settings

Example:
```javascript
const path = require('path')

module.exports = {
    // Change your theme root
    'theme.src.root': path.join(process.cwd(), 'src'),
    // Change your dist root
    'theme.dist.root': path.join(process.cwd(), 'dist'),
    // Change your theme source templates
    'theme.src.templates': path.join(process.cwd(), 'src/templates'),
    // Configure network settigns if you don't like the autoconfig
    'network.ipAddress': '192.168.1.1',
    'network.external': '',
    'network.interface': '',
    // Add additional entrypoint
    'entrypoints': {},
}
```

### Network settings
These are not required and by default are blank. If you would like to change the ip address that the local development server
runs on manually or by setting the interface (by name) you can change that here. It will otherwise run using the first
interface ip address in your system.

### packer-env.schema.js

Keys for environment variables, used in themekit and CI builds

```js
const commonPaths = require('../config/common-paths');

module.exports = {
  ...commonPaths,

  // The environment variable key which contains the name of the environment
  // Packer is running in
  'env.keys.name': 'PACKER_ENV',

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

  // The environment variable key which contains a list of file patterns to
  // allow deployment to live themes
  'env.keys.live': 'PACKER_LIVE',
};

```

### common-paths.js

```js
const path = require('path');

module.exports = {
  root: process.cwd(),
  package: (config) => path.join(config.get('root'), 'package.json'),
  commonExcludes: [/node_modules/, /assets\/static/],
  cache: (config) => path.join(config.get('root'), '.cache'),
  'packer.config': (config) =>
    path.join(config.get('root'), 'packer.config.js'),
  'packer.env': (config) => path.join(config.get('root'), 'packer.env.json'),

  /* Webpack merge files - https://www.npmjs.com/package/webpack-merge */
  'merge.dev': (config) => path.join(config.get('root'), 'dev.config.js'),
  'merge.prod': (config) => path.join(config.get('root'), 'prod.config.js'),

  /* PostCSS */
  postcss: (config) => path.join(config.get('root'), 'postcss.schema.js'),

  /* Theme Lint */
  'themelint.bin': () =>
    path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),

  /* ESLint */
  'eslint.bin': () => path.resolve(__dirname, '../../node_modules/.bin/eslint'),
  'eslint.schema': (config) => path.join(config.get('root'), '.eslintrc'),
  'eslint.ignore': (config) => path.join(config.get('root'), '.eslintignore'),

  /* Prettier */
  'prettier.bin': () =>
    path.resolve(__dirname, '../../node_modules/.bin/prettier'),
  'prettier.schema': (config) => path.join(config.get('root'), '.prettierrc'),
  'prettier.ignore': (config) =>
    path.join(config.get('root'), '.prettierignore'),

  /* Stylelint */
  'stylelint.bin': () =>
    path.resolve(__dirname, '../../node_modules/.bin/stylelint'),
  'stylelint.schema': (config) => path.join(config.get('root'), '.stylelintrc'),
  'stylelint.ignore': (config) =>
    path.join(config.get('root'), '.stylelintignore'),

  /* Theme path settings */
  /* src folder */
  'theme.src.assets': (config) =>
    path.join(config.get('theme.src.root'), 'assets'),
  'theme.src.scripts': (config) =>
    path.join(config.get('theme.src.root'), 'scripts'),
  'theme.src.styles': (config) =>
    path.join(config.get('theme.src.root'), 'styles'),
  'theme.src.layout': (config) =>
    path.join(config.get('theme.src.root'), 'layout'),
  'theme.src.locales': (config) =>
    path.join(config.get('theme.src.root'), 'locales'),
  'theme.src.templates': (config) =>
    path.join(config.get('theme.src.root'), 'templates'),
  'theme.src.customers': (config) =>
    path.join(config.get('theme.src.root'), 'templates/customers'),
  'theme.src.sections': (config) =>
    path.join(config.get('theme.src.root'), 'sections'),
  'theme.src.snippets': (config) =>
    path.join(config.get('theme.src.root'), 'snippets'),
  'theme.src.config': (config) =>
    path.join(config.get('theme.src.root'), 'config'),
  'theme.src.root': (config) => path.join(config.get('root'), './src'),

  /* dist folder */
  'theme.dist.assets': (config) =>
    path.join(config.get('theme.dist.root'), 'assets'),
  'theme.dist.scripts': (config) =>
    path.join(config.get('theme.dist.root'), 'scripts'),
  'theme.dist.styles': (config) =>
    path.join(config.get('theme.dist.root'), 'styles'),
  'theme.dist.layout': (config) =>
    path.join(config.get('theme.dist.root'), 'layout'),
  'theme.dist.locales': (config) =>
    path.join(config.get('theme.dist.root'), 'locales'),
  'theme.dist.templates': (config) =>
    path.join(config.get('theme.dist.root'), 'templates'),
  'theme.dist.customers': (config) =>
    path.join(config.get('theme.dist.root'), 'templates/customers'),
  'theme.dist.sections': (config) =>
    path.join(config.get('theme.dist.root'), 'sections'),
  'theme.dist.snippets': (config) =>
    path.join(config.get('theme.dist.root'), 'snippets'),
  'theme.dist.config': (config) =>
    path.join(config.get('theme.dist.root'), 'config'),
  'theme.dist.root': (config) => path.join(config.get('root'), './dist'),
};

```

### packer.schema.js

```js
const commonPaths = require('./src/config/common-paths');

module.exports = {
  ...commonPaths,
  entrypoints: {},
  'network.ip': '',
  'network.external': '',
  'network.interface': '',
};
```