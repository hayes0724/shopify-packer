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
const {customConfigCheck} = require('../custom');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
config.set('files.layout', getLayoutEntrypoints());
config.set('files.template', getTemplateEntrypoints());

// Parts
const core = require('../parts/core');
const css = require('../parts/css');
const scss = require('../parts/scss');
const assets = require('../parts/assets');
const copy = require('../parts/copy');
const optimization = require('../parts/optimization');
const liquidStyles = require('../parts/liquid-styles');
const mergeProd = customConfigCheck(config.get('merge.prod'));

core.entry = {
  ...config.get('files.layout'),
  ...config.get('files.template'),
  ...config.get('entrypoints'),
};

const output = merge([
  liquidStyles,
  core,
  assets,
  scss,
  css,
  copy,
  {
    mode: 'production',
    devtool: false,
    optimization: optimization,
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css',
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
        liquidTemplates: config.get('files.template'),
        liquidLayouts: config.get('files.layout'),
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
        liquidTemplates: config.get('files.template'),
        liquidLayouts: config.get('files.layout'),
      }),
      new IncludeLiquidStylesPlugin(),
    ],
  },
  mergeProd,
]);

module.exports = output;
