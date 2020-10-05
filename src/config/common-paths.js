const path = require('path');

module.exports = {
  'root': process.cwd(),
  'package': (config) => path.join(config.get('root'), 'package.json'),
  'commonExcludes': [/node_modules/, /assets\/static/],
  'cache': (config) => path.join(config.get('root'), '.cache'),
  'packer.config': (config) =>
    path.join(config.get('root'), 'packer.config.js'),
  'packer.env': (config) => path.join(config.get('root'), 'packer.env.json'),

  /* Webpack merge files - https://www.npmjs.com/package/webpack-merge */
  'merge.dev': (config) => path.join(config.get('root'), 'dev.schema.js'),
  'merge.prod': (config) => path.join(config.get('root'), 'prod.schema.js'),

  /* PostCSS */
  'postcss': (config) => path.join(config.get('root'), 'postcss.schema.js'),

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
  'stylelint.bin': path.resolve(__dirname, '../../node_modules/.bin/stylelint'),
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
  'theme.src.root': (config) => path.join(config.get('root'), './dist'),

  /* dist folder */
  'theme.dist.assets': (config) =>
    path.join(config.get('theme.dist.root'), 'assets'),
  'theme.dist.scripts': (config) =>
    path.join(config.get('theme.src.root'), 'scripts'),
  'theme.dist.styles': (config) =>
    path.join(config.get('theme.src.root'), 'styles'),
  'theme.dist.layout': (config) =>
    path.join(config.get('theme.src.root'), 'layout'),
  'theme.dist.locales': (config) =>
    path.join(config.get('theme.src.root'), 'locales'),
  'theme.dist.templates': (config) =>
    path.join(config.get('theme.src.root'), 'templates'),
  'theme.dist.customers': (config) =>
    path.join(config.get('theme.src.root'), 'templates/customers'),
  'theme.dist.sections': (config) =>
    path.join(config.get('theme.src.root'), 'sections'),
  'theme.dist.snippets': (config) =>
    path.join(config.get('theme.src.root'), 'snippets'),
  'theme.dist.config': (config) =>
    path.join(config.get('theme.src.config'), 'config'),
  'theme.dist.root': (config) => path.join(config.get('root'), './dist'),
};
