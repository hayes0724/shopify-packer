const path = require('path');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));
const isDev = process.env.NODE_ENV !== 'production';

const core = {
  context: config.get('root'),

  output: {
    filename: isDev ? '[name].js' : 'assets/[name].js',
    path: isDev
      ? config.get('theme.dist.assets')
      : config.get('theme.dist.root'),
    clean: true,
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../../../node_modules'),
      path.resolve(__dirname, '../../'),
      path.resolve(config.get('root'), 'node_modules'),
      config.get('root'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(liquid|json)$/,
        exclude: [/(css|scss|sass)\.liquid$/, ...config.get('commonExcludes')],
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        exclude: config.get('commonExcludes'),
      },
    ],
  },
  plugins: [],
};

module.exports = core;
