const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const assets = {
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        exclude: config.get('commonExcludes'),
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: config.get('commonExcludes'),
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
};

module.exports = assets;
