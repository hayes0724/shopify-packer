const path = require('path');
const os = require('os');
const {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
} = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const selfsigned = require('selfsigned');

const spinner = ora(chalk.magenta('Creating SSL certificate...'));
const certFolder = path.resolve(os.homedir(), '.localhost_ssl/');

function makeCert(args) {
  const name = args.name ? args.name : 'localhost';
  spinner.start();
  const attrs = [{name: 'commonName', value: name}];
  const pems = selfsigned.generate(attrs, {days: 365});
  makeCertFolder();
  try {
    const certFile = path.resolve(certFolder, `${name}.crt`);
    const keyFile = path.resolve(certFolder, `${name}.key`);
    writeFileSync(certFile, pems.cert);
    writeFileSync(keyFile, pems.private);
    console.log(chalk.green(`SSL Cert: ${certFile}`));
    console.log(chalk.green(`SSL Key: ${keyFile}`));
    spinner.succeed('SSL certificate created successfully!');
  } catch (err) {
    console.error(err);
    spinner.fail();
  }
}

function sslKeyCert() {
  makeCertFolder();
  const key = readFileSync(getSSLKeyPath());
  const cert = readFileSync(getSSLCertPath());
  return {key, cert};
}

function getSSLKeyPath() {
  const fileName = findKey() || 'localhost.key';
  const key = path.resolve(certFolder, fileName);
  return existsSync(key) ? key : path.join(__dirname, './server.pem');
}

function getSSLCertPath() {
  const fileName = findCert() || 'localhost.crt';
  const cert = path.resolve(certFolder, fileName);
  return existsSync(cert) ? cert : path.join(__dirname, './server.pem');
}

function findCert() {
  const files = readdirSync(certFolder);
  return files.find((file) => file.includes('.crt') || file.includes('.cer'));
}

function findKey() {
  const files = readdirSync(certFolder);
  return files.find((file) => file.includes('.key') || file.includes('.pem'));
}

function makeCertFolder() {
  if (!existsSync(certFolder)) {
    console.log(chalk.green(`\nCreating a cert folder at: ${certFolder}`));
    mkdirSync(certFolder);
  }
}

module.exports = {
  makeCert,
  sslKeyCert,
  getSSLCertPath,
  getSSLKeyPath,
};
