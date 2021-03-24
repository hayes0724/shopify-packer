const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));

const core = {
  context: config.get('root'),

  output: {
    filename: '[name].js',
    path: config.get('theme.dist.assets'),
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
        test: /(css|scss|sass)\.liquid$/,
        exclude: config.get('commonExcludes'),
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            return `${pathData.runtime.split('.')[0]}.${
              path.basename(pathData.filename).split('.')[0]
            }.styleLiquid.css.liquid`;
          },
        },
      },
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist/**/*')],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: config.get('theme.src.assets'),
          to: `${config.get('theme.dist.assets')}/[name][ext]`,
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
