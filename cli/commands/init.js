const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const extract = require('extract-zip');
const download = require('download');
const ora = require('ora');

module.exports = (args) => {
    const cmd = args._;
    if (cmd.length < 2) {
        console.log(chalk.red("Please include a directory to install in"));
        process.exit(0)
    }
    const spinner = ora(chalk.magenta('Initializing new theme...'));
    spinner.start();

    const dir = path.join(process.cwd(), args._[1]);
    const tempfile = path.join(dir, 'temp.zip');
    const release = `https://github.com/hayes0724/packer-blank-theme/archive/1.0.0.zip`;
    const extracted = path.join(dir, 'packer-blank-theme-1.0.0');
    spinner.text = "Starting download...";

    fs.ensureDir(dir)
        .then(() => download(release, dir, { filename: 'temp.zip' }))
        .then(() => {
            spinner.text = "Extracting the files from archive...";
            return new Promise((res, rej) => {
                extract(tempfile, { dir }, e => {
                    if (e) rej(e)
                    res(fs.copy(
                        extracted,
                        dir
                    ))
                })
            })
        })
        .then(() => fs.remove(tempfile))
        .then(() => fs.remove(extracted))
        .then(() => {
            spinner.succeed('Theme initialized!');
            process.exit(0)
        })
        .catch(e => {
            spinner.fail("There was an error:");
            console.log(chalk.red(e.message || e));
            console.log(chalk.red(`Removing directory ${dir}...`));
            fs.remove(dir, err => {
                if (err) console.log(err);
                process.exit(1)
            });

        })
}