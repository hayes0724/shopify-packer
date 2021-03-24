const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IncludeLiquidStylesPlugin = require('../include-liquid-styles');

const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const development = false;
process.env.NODE_ENV = 'production';
const getChunkName = require('../../utilities/get-chunk-name');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
const {customConfigCheck} = require('../custom');
// Parts
const core = require('../parts/core');
const css = require('../parts/css');
const scss = require('../parts/scss');

const mergeProd = customConfigCheck(config.get('merge.prod'));
config.set('layoutEntrypoints', getLayoutEntrypoints());
config.set('templateEntrypoints', getTemplateEntrypoints());

core.entry = {
  ...config.get('layoutEntrypoints'),
  ...config.get('templateEntrypoints'),
  ...config.get('entrypoints'),
};

const output = merge([
  core,
  scss,
  css,
  {
    mode: 'production',
    devtool: false,
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'},
      }),

      new HtmlWebpackPlugin({
        excludeChunks: ['static'],
        filename: `${config.get('theme.dist.snippets')}/script-tags.liquid`,
        template: path.resolve(__dirname, '../script-tags.html'),
        inject: false,
        showErrors: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
        },
        isDevServer: development,
        liquidTemplates: config.get('templateEntrypoints'),
        liquidLayouts: config.get('layoutEntrypoints'),
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
        },
        isDevServer: development,
        liquidTemplates: config.get('templateEntrypoints'),
        liquidLayouts: config.get('layoutEntrypoints'),
      }),
      new IncludeLiquidStylesPlugin(),
    ],
    optimization: {
      nodeEnv: 'production',
      minimize: true,
      splitChunks: {
        cacheGroups: {
          defaultVendors: false,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: getChunkName,
            chunks: 'initial',
          },
          default: {
            test: /[\\/]src[\\/]/,
            name: getChunkName,
            chunks: 'initial',
          },
        },
      },
    },
  },
  mergeProd,
]);

module.exports = output;
