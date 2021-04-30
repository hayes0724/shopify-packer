const path = require('path');
const os = require('os');
const {existsSync, readFileSync, writeFileSync, mkdirSync} = require('fs');
const chalk = require('chalk');
const mkcert = require('mkcert');
const PackerConfig = require('../config');
const config = new PackerConfig(require('../../packer.schema'));
const certFolder = path.resolve(os.homedir(), '.localhost_ssl/');

function makeCertFolder() {
  if (!existsSync(certFolder)) {
    console.log(chalk.green(`\nCreating a cert folder at: ${certFolder}`));
    mkdirSync(certFolder);
  }
}

function checkCA() {
  return (
    existsSync(config.get('ssl.ca.cert')) &&
    existsSync(config.get('ssl.ca.key'))
  );
}

function checkCert() {
  return (
    existsSync(config.get('ssl.cert')) && existsSync(config.get('ssl.key'))
  );
}

function createCA() {
  return mkcert.createCA({
    organization: 'Shopify Packer',
    countryCode: 'US',
    state: 'Texas',
    locality: 'Austin',
    validityDays: 365,
  });
}

function createCert() {
  const caCert = readFileSync(config.get('ssl.ca.cert'));
  const caKey = readFileSync(config.get('ssl.ca.key'));
  return mkcert.createCert({
    domains: ['127.0.0.1', 'localhost'],
    validityDays: 365,
    caKey: caKey,
    caCert: caCert,
  });
}

function getSSL() {
  const key = readFileSync(config.get('ssl.key'));
  const cert = readFileSync(config.get('ssl.cert'));
  const ca = readFileSync(config.get('ssl.ca.cert'));
  return {key, cert, ca};
}

function checkSSL() {
  makeCertFolder();

  const writeCert = (cert, key) => {
    writeFileSync(config.get('ssl.cert'), cert);
    writeFileSync(config.get('ssl.key'), key);
  };

  const writeCA = (cert, key) => {
    writeFileSync(config.get('ssl.ca.cert'), cert);
    writeFileSync(config.get('ssl.ca.key'), key);
  };

  if (!checkCA()) {
    console.log(
      'No Certificate Authority (CA) found. Creating one now to issue new SSL certificates'
    );
    createCA()
      .then(({cert, key}) => writeCA(cert, key))
      .catch((err) => console.error(err));
  }
  if (!checkCert()) {
    console.log('No SSL Certificate found. Creating one now');
    createCert()
      .then(({cert, key}) => writeCert(cert, key))
      .catch((err) => console.error(err));
  }
}

function validate() {
  console.log('');
  if (!checkCA()) {
    console.error(`No Certificate Authority (CA) found in: ${certFolder}`);
  } else {
    console.log(chalk.green(`CA key: ${config.get('ssl.ca.key')}`));
    console.log(chalk.green(`CA cert: ${config.get('ssl.ca.cert')}`));
  }
  if (!checkCert()) {
    console.error(`No SSL Certificate found in: ${certFolder}`);
  } else {
    console.log(chalk.green(`SSL key: ${config.get('ssl.key')}`));
    console.log(chalk.green(`SSL cert: ${config.get('ssl.cert')}`));
  }
  console.log('');
}

module.exports = {
  checkCA,
  checkSSL,
  getSSL,
  validate,
};
