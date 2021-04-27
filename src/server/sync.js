const https = require('https');
const chalk = require('chalk');
const figures = require('figures');
const themekit = require('@shopify/themekit');
const PackerConfig = require('../config');
const config = new PackerConfig(require('../../packer.schema'));
const flags = require('minimist')(process.argv.slice(2));

const {
  validate,
  getEnvNameValue,
  getPasswordValue,
  getStoreValue,
  getThemeIdValue,
  getIgnoreFilesValue,
  getAllowLiveValue,
} = require('../env');

let deploying = false;
let filesToDeploy = [];

function maybeDeploy() {
  if (deploying) {
    return Promise.reject(new Error('Deploy already in progress.'));
  }

  if (filesToDeploy.length) {
    const files = [...filesToDeploy];
    filesToDeploy = [];
    return deploy('deploy', files);
  }

  return Promise.resolve();
}

function _validateEnvValues() {
  const result = validate();

  if (!result.isValid) {
    console.log(
      chalk.red(
        `Some values in environment '${getEnvNameValue()}' are invalid:`
      )
    );
    throw result.errors.forEach((error) => {
      console.log(chalk.red(`- ${error}`));
    });
  }
}

function _generateConfigFlags() {
  _validateEnvValues();

  return {
    password: getPasswordValue(),
    themeid: getThemeIdValue(),
    store: getStoreValue(),
    env: getEnvNameValue(),
    ignoredFiles: getIgnoreFilesValue().split(':'),
    allowLive: flags['allowLive'] || getAllowLiveValue(),
  };
}

/**
 * Deploy to Shopify using themekit.
 *
 * @param   cmd     String    The command to run
 * @param   files   Array     An array of files to deploy
 * @param   replace bool      Replace existing files
 * @return          Promise
 */
async function deploy(cmd = '', files = [], replace = true) {
  if (!['deploy'].includes(cmd)) {
    throw new Error('shopify-deploy.deploy() first argument must be deploy');
  }
  deploying = true;

  console.log(chalk.magenta(`\n${figures.arrowUp}  Uploading to Shopify...`));
  getDeploymentSettings(replace);

  try {
    await promiseThemekitConfig();
    await promiseThemekitDeploy(cmd, files, replace);
  } catch (error) {
    console.log(chalk.red(`- ${error}`));
  }

  deploying = false;

  return maybeDeploy;
}

async function promiseThemekitConfig() {
  await themekit.command('configure', _generateConfigFlags(), {
    cwd: config.get('theme.dist.root'),
  });
}

async function promiseThemekitDeploy(cmd, files, replace) {
  const settings = _generateConfigFlags();
  settings.noUpdateNotifier = true;
  settings.files = files;
  if (!replace) {
    console.log('using no delete flag, files will not be removed before');
    settings.nodelete = true;
  }
  return await themekit.command(cmd, settings, {
    cwd: config.get('theme.dist.root'),
  });
}

/**
 * Fetch the main theme ID from Shopify
 * @return {Promise} Reason for abort or the main theme ID
 */
function fetchMainThemeId() {
  _validateEnvValues();

  return new Promise((resolve, reject) => {
    https.get(
      {
        hostname: getStoreValue(),
        path: '/admin/themes.json',
        auth: `:${getPasswordValue}`,
        agent: false,
        headers: {
          'X-Shopify-Access-Token': getPasswordValue(),
        },
      },
      (res) => {
        let body = '';

        res.on('data', (datum) => (body += datum));

        res.on('end', () => {
          const parsed = JSON.parse(body);

          if (parsed.errors) {
            reject(
              new Error(
                `API request to fetch main theme ID failed: \n${JSON.stringify(
                  parsed.errors,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          if (!Array.isArray(parsed.themes)) {
            reject(
              new Error(
                `Shopify response for /admin/themes.json is not an array. ${JSON.stringify(
                  parsed,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          const mainTheme = parsed.themes.find((t) => t.role === 'main');

          if (!mainTheme) {
            reject(
              new Error(
                `No main theme in response. ${JSON.stringify(
                  parsed.themes,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          resolve(mainTheme.id);
        });
      }
    );
  });
}

function getDeploymentSettings(replace) {
  const mode = replace ? 'replace' : 'noDelete';
  console.log(chalk.blue(`${figures.info} Deploy Mode: ${mode}`));
  console.log(
    chalk.blue(`${figures.info} Environment: ${getEnvNameValue()} \n`)
  );
}

module.exports = {
  async sync(files = []) {
    if (!files.length) {
      return Promise.reject(new Error('No files to deploy.'));
    }
    filesToDeploy = [...new Set([...filesToDeploy, ...files])];

    return maybeDeploy();
  },

  replace() {
    return deploy('deploy', [], true);
  },

  deploy() {
    return deploy('deploy', [], false);
  },

  fetchMainThemeId,
};
