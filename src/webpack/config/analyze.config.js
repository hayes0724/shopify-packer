const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const production = require('./prod.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log(chalk.green(`Loading Bundle Analyzer`))

const output = merge([
    production,
    {
        plugins: [
            new BundleAnalyzerPlugin()
        ],
    },
])

module.exports = output;
