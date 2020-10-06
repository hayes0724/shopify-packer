const fs = require('fs');

const chalk = require('chalk');

const customConfigCheck = (customConfig) => {
  if (fs.existsSync(customConfig)) {
    console.log(
      chalk.blue(`Custom webpack configuration found ${customConfig}`)
    );
    return require(customConfig);
  } else {
    console.log(
      chalk.yellow(`No custom webpack configuration found ${customConfig}`)
    );
    return {};
  }
};

module.exports = {customConfigCheck};
