const getChunkName = require('../../utilities/get-chunk-name');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const optimization = {
  nodeEnv: 'production',
  minimize: true,
  splitChunks: {
    cacheGroups: {
      defaultVendors: false,
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        name: getChunkName,
        priority: 5,
      },
    },
  },
};

if (config.get('build.sharedBundles')) {
  optimization.splitChunks.cacheGroups.default = {
    name: getChunkName,
    chunks: 'initial',
  };
}

if (config.get('build.sharedVendorBundles')) {
  optimization.splitChunks.cacheGroups.vendor = {
    name: getChunkName,
    chunks: 'initial',
  };
}

module.exports = optimization;
