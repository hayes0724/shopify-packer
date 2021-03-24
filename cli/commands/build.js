const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const {writeFileSync} = require('fs');
const spinner = ora(chalk.magenta('Compiling...'));

module.exports = (args) => {
  let config;
  if (args.analyze) {
    config = require('../../src/webpack/config/analyze.config');
    console.log(chalk.green(`Loading Bundle Analyzer`));
  } else {
    config = require('../../src/webpack/config/prod.config');
  }

  spinner.start();

  webpack(config, (err, stats) => {
    if (err) throw err;

    if (args.stats) {
      const level = typeof args.stats === 'string' ? args.stats : 'verbose';
      writeFileSync(
        'stats.json',
        JSON.stringify(stats.toJson(level), null, 2),
        'utf8'
      );
    }
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })}`
    );

    console.log('');
    spinner.stop();

    if (stats.compilation.errors.length) throw Error('Compile errors');
  });
};
