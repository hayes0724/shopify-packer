const path = require('path');

module.exports = {
  root: process.cwd(),
  package: (config) => path.join(config.get('root'), 'package.json'),
  commonExcludes: [/node_modules/, /assets\/static/],
  cache: (config) => path.join(config.get('root'), '.cache'),
  'packer.config': (config) => path.join(config.get('root'), 'packer.config.js'),
  'packer.env': (config) => path.join(config.get('root'), 'packer.env.json'),
  merge: {
    dev: (config) => path.join(config.get('root'), 'dev.schema.js'),
    prod: (config) => path.join(config.get('root'), 'prod.schema.js'),
  },
  postcss: (config) => path.join(config.get('root'), 'postcss.schema.js'),
  themelint: {
    bin: path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),
    schema: path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),
    ignore: path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),
  },
  eslint: {
    bin: path.resolve(__dirname, '../../node_modules/.bin/eslint'),
    ignore: (config) => path.join(config.get('root'), '.eslintignore'),
    schema: (config) => path.join(config.get('root'), '.eslintrc'),
  },
  prettier: {
    bin: path.resolve(__dirname, '../../node_modules/.bin/prettier'),
    ignore: (config) => path.join(config.get('root'), '.prettierignore'),
    schema: (config) => path.join(config.get('root'), '.prettierrc'),
  },
  stylelint: {
    bin: path.resolve(__dirname, '../../node_modules/.bin/stylelint'),
    ignore: (config) => path.join(config.get('root'), '.stylelintignore'),
    schema: (config) => path.join(config.get('root'), '.stylelintrc'),
  },
  theme: {
    src: {
      assets: (config) => path.join(config.get('theme.src.root'), 'assets'),
      schema: (config) => path.join(config.get('theme.src.root'), 'schema'),
      scripts: (config) => path.join(config.get('theme.src.root'), 'scripts'),
      styles: (config) => path.join(config.get('theme.src.root'), 'styles'),
      layout: (config) => path.join(config.get('theme.src.root'), 'layout'),
      locales: (config) => path.join(config.get('theme.src.root'), 'locales'),
      snippets: (config) => path.join(config.get('theme.src.root'), 'snippets'),
      templates: (config) =>
        path.join(config.get('theme.src.root'), 'templates'),
      customers: (config) =>
        path.join(config.get('theme.src.root'), 'templates/customers'),
      sections: (config) => path.join(config.get('theme.src.root'), 'sections'),
      root: (config) => path.join(config.get('root'), 'src'),
    },
    dist: {
      assets: (config) => path.join(config.get('theme.dist.root'), 'assets'),
      schema: (config) => path.join(config.get('theme.dist.root'), 'schema'),
      scripts: (config) => path.join(config.get('theme.dist.root'), 'scripts'),
      styles: (config) => path.join(config.get('theme.dist.root'), 'styles'),
      layout: (config) => path.join(config.get('theme.dist.root'), 'layout'),
      locales: (config) => path.join(config.get('theme.dist.root'), 'locales'),
      snippets: (config) =>
        path.join(config.get('theme.dist.root'), 'snippets'),
      templates: (config) =>
        path.join(config.get('theme.dist.root'), 'templates'),
      customers: (config) =>
        path.join(config.get('theme.dist.root'), 'templates/customers'),
      sections: (config) =>
        path.join(config.get('theme.dist.root'), 'sections'),
      root: (config) => path.join(config.get('root'), './dist'),
    },
  },
};
