const webpack = require('webpack');
const {merge} = require('webpack-merge');

const production = require('./prod.config');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const webpackConfigAnalyze = merge([
  production,
  {
    plugins: [new BundleAnalyzerPlugin()],
  },
]);

module.exports = webpackConfigAnalyze;
