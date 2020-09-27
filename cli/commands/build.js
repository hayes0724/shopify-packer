const webpack = require('webpack');
const webpackConfig = require('../../src/webpack/config/prod.config');
const webpackConfigAnalyze = require('../../src/webpack/config/analyze.config');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.magenta('Compiling...'));

module.exports = (args) => {
    const config = args.analyze ? webpackConfigAnalyze : webpackConfig

    spinner.start();

    webpack(config, (err, stats) => {
        if (err) throw err;

        process.stdout.write(
            `${stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            })}`,
        );

        console.log('');
        spinner.stop();

        if (stats.compilation.errors.length) process.exit(1);
    });
}
