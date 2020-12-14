const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const development = process.env.NODE_ENV !== 'production';
const HtmlWebpackIncludeLiquidStylesPlugin = require('../html-webpack-include-chunks');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');

// Parts
const core = require('../parts/core');
const css = require('../parts/css');
const scss = require('../parts/scss');
const {customConfigCheck} = require('../custom');

const mergeDev = customConfigCheck(config.get('merge.dev'));

Object.keys(core.entry).forEach((name) => {
  core.entry[name] = [path.join(__dirname, '../hot-client.js')].concat(
    core.entry[name]
  );
});

module.exports = merge([
  core,
  scss,
  css,
  {
    mode: 'development',
    devtool: '#eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: config.get('commonExcludes'),
          loader: path.resolve(__dirname, '../hmr-alamo-loader.js'),
        },
        {
          test: /fonts\/.*\.(eot|svg|ttf|woff|woff2|otf)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: config.get('commonExcludes'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: false,
                name: '[name].[ext]',
              },
            },
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"development"'},
      }),

      new webpack.HotModuleReplacementPlugin(),

      new HtmlWebpackPlugin({
        excludeChunks: ['static'],
        filename: `${config.get('theme.dist.snippets')}/script-tags.liquid`,
        template: path.resolve(__dirname, '../script-tags.html'),
        inject: false,
        minify: {
          removeComments: true,
          removeAttributeQuotes: false,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        isDevServer: development,
        liquidTemplates: getTemplateEntrypoints(),
        liquidLayouts: getLayoutEntrypoints(),
      }),

      new HtmlWebpackPlugin({
        excludeChunks: ['static'],
        filename: `${config.get('theme.dist.snippets')}/style-tags.liquid`,
        template: path.resolve(__dirname, '../style-tags.html'),
        inject: false,
        minify: {
          removeComments: true,
          removeAttributeQuotes: false,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        isDevServer: development,
        liquidTemplates: getTemplateEntrypoints(),
        liquidLayouts: getLayoutEntrypoints(),
      }),

      new HtmlWebpackIncludeLiquidStylesPlugin(),
    ],
  },
  mergeDev,
]);
