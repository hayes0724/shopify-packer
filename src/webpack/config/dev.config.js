const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));
const development = process.env.NODE_ENV !== 'production';
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
const {customConfigCheck} = require('../custom');
const core = require('../parts/core');
const css = require('../parts/css');
const scss = require('../parts/scss');
const liquidStyles = require('../parts/liquid-styles');
const copy = require('../parts/copy');

const mergeDev = customConfigCheck(config.get('merge.dev'));
config.set('files.layout', getLayoutEntrypoints());
config.set('files.template', getTemplateEntrypoints());

core.entry = {
  ...config.get('files.layout'),
  ...config.get('files.template'),
  ...config.get('entrypoints'),
};

Object.keys(core.entry).forEach((name) => {
  core.entry[name] = [path.join(__dirname, '../hot-client.js')].concat(
    core.entry[name]
  );
});

module.exports = merge([
  liquidStyles,
  core,
  scss,
  css,
  copy,
  {
    mode: 'development',
    devtool: false,
    target: 'web',
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: config.get('commonExcludes'),
          loader: path.resolve(__dirname, '../hmr-alamo-loader.js'),
        },
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          exclude: config.get('commonExcludes'),
          type: 'asset',
          generator: {
            filename: '[name].[ext]',
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: config.get('commonExcludes'),
          type: 'asset',
          generator: {
            filename: '[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),

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
          removeAttributeQuotes: false,
        },
        isDevServer: development,
        liquidTemplates: config.get('files.template'),
        liquidLayouts: config.get('files.layout'),
      }),

      new HtmlWebpackTagsPlugin({
        links: ['layout.theme.styleLiquid.css'],
        append: true,
      }),
    ],
  },
  mergeDev,
]);
