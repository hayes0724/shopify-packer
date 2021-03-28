const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

const clean = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist/**/*')],
    }),
  ],
};

module.exports = clean;
