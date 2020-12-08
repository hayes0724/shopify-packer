const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PackerConfig = require('../../config');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
const config = new PackerConfig(require('../../../packer.schema'));

const extractLiquidStyles = new ExtractTextPlugin(
  '[name].styleLiquid.scss.liquid'
);

const core = {
  context: config.get('root'),

  output: {
    filename: '[name].js',
    path: config.get('theme.dist.assets'),
    chunkFilename: '[name].bundle.js',
  },

  entry: {
    ...getLayoutEntrypoints(),
    ...getTemplateEntrypoints(),
    ...config.get('entrypoints'),
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../../../node_modules'),
      path.resolve(__dirname, '../../'),
      path.resolve(config.get('root'), 'node_modules'),
      config.get('root'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(liquid|json)$/,
        exclude: [/(css|scss|sass)\.liquid$/, ...config.get('commonExcludes')],
        loader: 'file-loader',
        options: {
          name: '../[path][name].[ext]',
        },
      },
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
      },
      {
        test: /(css|scss|sass)\.liquid$/,
        exclude: config.get('commonExcludes'),
        use: extractLiquidStyles.extract(['concat-style-loader']),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({}),

    extractLiquidStyles,

    new CopyWebpackPlugin({
      patterns: [
        {
          from: config.get('theme.src.assets'),
          to: config.get('theme.dist.assets'),
          flatten: true,
        },
        {
          from: config.get('theme.src.layout'),
          to: config.get('theme.dist.layout'),
        },
        {
          from: config.get('theme.src.config'),
          to: config.get('theme.dist.config'),
        },
        {
          from: config.get('theme.src.locales'),
          to: config.get('theme.dist.locales'),
        },
        {
          from: config.get('theme.src.snippets'),
          to: config.get('theme.dist.snippets'),
        },
        {
          from: config.get('theme.src.templates'),
          to: config.get('theme.dist.templates'),
        },
        {
          from: config.get('theme.src.sections'),
          to: config.get('theme.dist.sections'),
        },
      ],
    }),
  ],
};

module.exports = core;
