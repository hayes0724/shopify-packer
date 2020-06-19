const {getThemes, create, remove, download} = require('../../src/theme');
const chalk = require('chalk')

module.exports = async (args) => {
    if (args.list) {
        await getThemes(args);
    }
    if (args.create) {
        await create(args);
    }
    if (args.remove) {
        await remove(args);
    }
    if (args.download) {
        download(args)
            .then((result) =>{
                console.log(chalk.green('Theme downloaded!'));
            })
            .catch((e) => {
                console.log(chalk.red('Error downloading files\n'));
                console.log(chalk.red(e));
            })
    }
};