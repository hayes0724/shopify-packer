const PackerConfig = require('../config');
const chalk = require('chalk');

const config = new PackerConfig(require('./packer-env.schema'));

const PACKER_ENV_VARS = [
  config.get('env.keys.name'),
  config.get('env.keys.store'),
  config.get('env.keys.password'),
  config.get('env.keys.id'),
  config.get('env.keys.ignore'),
  config.get('env.keys.live'),
];

const DEFAULT_ENV_VARS = [
  config.get('env.keys.store'),
  config.get('env.keys.password'),
  config.get('env.keys.id'),
  config.get('env.keys.ignore'),
  config.get('env.keys.live'),
];

function assign(envName = undefined) {
  const name = typeof envName === 'undefined' ? 'development' : envName;
  process.env[config.get('env.keys.name')] = name;

  const packerEnvFile = config.get('packer.env');
  let env;
  try {
    env = require(packerEnvFile);
  } catch (err) {
    console.error(
      chalk.red(`\nFailed to read ${packerEnvFile}, using env variables\n`)
    );
    return;
  }
  DEFAULT_ENV_VARS.forEach((key) => {
    process.env[key] = env[name][_getConfigKey(key)];
  });
}

// Get the values of Packers's required environment variables
function getPackerEnv() {
  const env = {};

  PACKER_ENV_VARS.forEach((key) => {
    env[key] = process.env[key];
  });

  return env;
}

function getEmptyPackerEnv() {
  const env = {};

  PACKER_ENV_VARS.forEach((key) => {
    env[key] = '';
  });

  return env;
}

// Clears the values of environment variables used by Packer
function clear() {
  PACKER_ENV_VARS.forEach((key) => (process.env[key] = ''));
}

function getEnvNameValue() {
  return process.env[config.get('env.keys.name')];
}

// Returns the configurable environment variable that reference the store URL
function getStoreValue() {
  const value = process.env[config.get('env.keys.store')];
  return typeof value === 'undefined' ? '' : value;
}

function getPasswordValue() {
  const value = process.env[config.get('env.keys.password')];
  return typeof value === 'undefined' ? '' : value;
}

function getThemeIdValue() {
  const value = process.env[config.get('env.keys.id')];
  return typeof value === 'undefined' ? '' : value;
}

function getAllowLiveValue() {
  const value = process.env[config.get('env.keys.live')];
  return value === 'true';
}

function getIgnoreFilesValue() {
  const value = process.env[config.get('env.keys.ignore')];
  return typeof value === 'undefined' ? '' : value;
}

function setAllowLiveValue(value) {
  process.env[config.get('env.keys.live')] = value;
}

function validate() {
  const errors = [].concat(
    _validateStore(),
    _validatePassword(),
    _validateThemeId()
  );

  return {
    errors,
    isValid: errors.length === 0,
  };
}

function _validateStore() {
  const errors = [];
  const store = getStoreValue();

  if (store.length === 0) {
    errors.push(new Error(`${config.get('env.keys.store')} must not be empty`));
  } else if (
    store.indexOf('.myshopify.com') < 1 &&
    store.indexOf('.myshopify.io') < 1
  ) {
    errors.push(
      new Error(
        `${config.get('env.keys.store')} must be a valid .myshopify.com URL`
      )
    );
  } else if (store.slice(-1) === '/') {
    errors.push(
      new Error(
        `${config.get('env.keys.store')} must not end with a trailing slash`
      )
    );
  }

  return errors;
}

function _validatePassword() {
  const errors = [];
  const password = getPasswordValue();

  if (password.length === 0) {
    errors.push(
      new Error(`${config.get('env.keys.password')} must not be empty`)
    );
  } else if (!/^\w+$/.test(password)) {
    errors.push(
      new Error(
        `${config.get(
          'env.keys.password'
        )} can only contain numbers and letters`
      )
    );
  }

  return errors;
}

function _validateThemeId() {
  const errors = [];
  const themeId = getThemeIdValue();

  if (themeId.length === 0) {
    errors.push(new Error(`${config.get('env.keys.id')} must not be empty`));
  } else if (themeId !== 'live' && !/^\d+$/.test(themeId)) {
    errors.push(
      new Error(
        `${config.get(
          'env.keys.id'
        )} can be set to 'live' or a valid theme ID containing only numbers`
      )
    );
  }

  return errors;
}

function _getConfigKey(value) {
  return value.replace('PACKER_', '').toLowerCase();
}

module.exports = {
  assign,
  validate,
  clear,
  getPackerEnv,
  getEmptyPackerEnv,
  getAllowLiveValue,
  setAllowLiveValue,
  getEnvNameValue,
  getStoreValue,
  getPasswordValue,
  getThemeIdValue,
  getIgnoreFilesValue,
};
