const CopyWebpackPlugin = require('copy-webpack-plugin');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const copy = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: config.get('theme.src.assets'),
          to: `${config.get('theme.dist.assets')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.layout'),
          to: `${config.get('theme.dist.layout')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.config'),
          to: `${config.get('theme.dist.config')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.locales'),
          to: `${config.get('theme.dist.locales')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.snippets'),
          to: `${config.get('theme.dist.snippets')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.templates'),
          to: `${config.get('theme.dist.templates')}/[name][ext]`,
        },
        {
          from: config.get('theme.src.sections'),
          to: `${config.get('theme.dist.sections')}/[name][ext]`,
        },
      ],
    }),
  ],
};

module.exports = copy;
