const path = require('path');
const os = require('os');
const {existsSync, readFileSync, readdirSync} = require('fs');

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
  sslKeyCert,
  getSSLCertPath,
  getSSLKeyPath,
};
