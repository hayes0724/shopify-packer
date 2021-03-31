const isDev = process.env.NODE_ENV !== 'production';
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));
const path = require('path');

const liquidStyles = {
  module: {
    rules: [
      {
        test: /(css|scss|sass)\.liquid$/,
        exclude: config.get('commonExcludes'),
        type: 'asset/resource',
        generator: {},
      },
    ],
  },
};

if (!isDev) {
  liquidStyles.module.rules[0].generator = {
    filename: (pathData) => {
      return `assets/${pathData.runtime.split('.')[0]}.${
        path.basename(pathData.filename).split('.')[0]
      }.styleLiquid.css.liquid`;
    },
  };
} else {
  liquidStyles.module.rules[0].generator = {
    filename: (pathData) => {
      return `layout.${
        path.basename(pathData.filename).split('.')[0]
      }.styleLiquid.css.liquid`;
    },
  };
}

module.exports = liquidStyles;
