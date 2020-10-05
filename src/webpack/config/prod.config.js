const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const development = false;
process.env.NODE_ENV = 'production';
const HtmlWebpackIncludeLiquidStylesPlugin = require('../html-webpack-include-chunks');
const getChunkName = require('../../utilities/get-chunk-name');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
const {customConfigCheck} = require('../custom');
// Parts
const core = require('../parts/core');
const css = require('../parts/css');
const scss = require('../parts/scss');

const mergeProd = customConfigCheck(config.get('merge.prod'));

const output = merge([
  core,
  scss,
  css,
  {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css.liquid',
      }),

      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'},
      }),

      // generate dist/layout/*.liquid for all layout files with correct paths to assets
      new HtmlWebpackPlugin({
        excludeChunks: ['static'],
        filename: `${config.get('theme.dist.snippets')}/script-tags.liquid`,
        template: path.resolve(__dirname, '../script-tags.html'),
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
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
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        isDevServer: development,
        liquidTemplates: getTemplateEntrypoints(),
        liquidLayouts: getLayoutEntrypoints(),
      }),

      new HtmlWebpackIncludeLiquidStylesPlugin(),

      // new SlateTagPlugin(packageJson.version),
    ],
    optimization: {
      nodeEnv: 'production',
      minimize: true,
      splitChunks: {
        chunks: 'all',
        name: getChunkName,
      },
    },
  },
  mergeProd,
]);

module.exports = output;
