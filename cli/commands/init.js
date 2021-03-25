const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const extract = require('extract-zip');
const download = require('download');
const ora = require('ora');
const axios = require('axios');

module.exports = (args) => {
  args.repo = args.repo ? args.repo : 'hayes0724/packer-blank-theme';
  const cmd = args._;
  if (cmd.length < 2) {
    throw console.log(chalk.red('Please include a directory to install in'));
  }
  const spinner = ora(chalk.magenta('Initializing new theme...'));
  spinner.start();

  const dir = path.join(process.cwd(), args._[1]);
  const tempfile = path.join(dir, 'temp.zip');

  axios
    .get(`https://api.github.com/repos/${args.repo}/releases/latest`)
    .then((response) => {
      const release = `https://github.com/${args.repo}/archive/${response.data.tag_name}.zip`;
      const extracted = path.join(
        dir,
        `${args.repo.split('/')[1]}-${response.data.tag_name.replace('v', '')}`
      );
      spinner.text = 'Starting download...';
      fs.ensureDir(dir)
        .then(() => download(release, dir, {filename: 'temp.zip'}))
        .then(() => extract(tempfile, {dir: dir}))
        .then(() => fs.copy(extracted, dir))
        .then(() => fs.remove(tempfile))
        .then(() => {
          fs.remove(extracted);
          spinner.succeed('Theme initialized!');
        })
        .catch((e) => {
          spinner.fail('There was an error:');
          console.log(chalk.red(e.message || e));
          console.log(chalk.red(`Removing directory ${dir}...`));
          fs.remove(dir, (err) => {
            if (err);
            spinner.fail('There was an error:');
            throw Error(err);
          });
        });
    })
    .catch((error) => {
      spinner.fail('There was an error:');
      console.log(error);
    });
};
