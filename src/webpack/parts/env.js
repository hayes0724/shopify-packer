const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));
require('dotenv').config({path: `${config.get('root')}/.env`});
const webpack = require('webpack');

const env = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};

module.exports = env;
