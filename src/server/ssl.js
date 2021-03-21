const path = require('path');
const os = require('os');
const {existsSync, readFileSync, readdirSync, writeFileSync} = require('fs');

const chalk = require('chalk');
const ora = require('ora');
const selfsigned = require('selfsigned');

const spinner = ora(chalk.magenta('Creating SSL certificate...'));

function makeCert(args) {
  const name = args.name ? args.name : 'localhost';
  spinner.start();
  const attrs = [{name: 'commonName', value: name}];
  const pems = selfsigned.generate(attrs, {days: 365});
  try {
    const certFile = path.resolve(
      os.homedir(),
      '.localhost_ssl/',
      `${name}.crt`
    );
    const keyFile = path.resolve(
      os.homedir(),
      '.localhost_ssl/',
      `${name}.key`
    );
    writeFileSync(certFile, pems.cert);
    writeFileSync(keyFile, pems.private);
    console.log('\n');
    console.log(chalk.green(`SSL Cert: ${certFile}`));
    console.log(chalk.green(`SSL Key: ${keyFile}`));
    console.log('\n');
    spinner.succeed('SSL certificate created successfully!');
  } catch (err) {
    console.error(err);
    spinner.fail();
  }
}

function sslKeyCert() {
  const key = readFileSync(getSSLKeyPath());
  const cert = readFileSync(getSSLCertPath());

  return {key, cert};
}

function getSSLKeyPath() {
  const fileName = findKey() || 'localhost.key';
  const key = path.resolve(os.homedir(), '.localhost_ssl/', fileName);
  return existsSync(key) ? key : path.join(__dirname, './server.pem');
}

function getSSLCertPath() {
  const fileName = findCert() || 'localhost.crt';
  const cert = path.resolve(os.homedir(), '.localhost_ssl/', fileName);
  return existsSync(cert) ? cert : path.join(__dirname, './server.pem');
}

function findCert() {
  const files = readdirSync(path.resolve(os.homedir(), '.localhost_ssl'));
  return files.find((file) => file.includes('.crt') || file.includes('.cer'));
}

function findKey() {
  const files = readdirSync(path.resolve(os.homedir(), '.localhost_ssl'));
  return files.find((file) => file.includes('.key') || file.includes('.pem'));
}

module.exports = {
  makeCert,
  sslKeyCert,
  getSSLCertPath,
  getSSLKeyPath,
};
