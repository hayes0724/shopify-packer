const path = require('path');

const webpack = require('webpack');

const paths = require('../../utilities/paths').config;

const dev = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: paths.commonExcludes,
        loader: path.resolve(__dirname, '../hmr-alamo-loader.js'),
      },
      {
        test: /fonts\/.*\.(eot|svg|ttf|woff|woff2|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: paths.commonExcludes,
        use: [
          {loader: 'file-loader', options: {name: '[name].[ext]'}},
          {loader: 'img-loader'},
          {
            loader: 'url-loader',
            options: {
              limit: false,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

module.exports = dev;
