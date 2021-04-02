const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const extract = require('extract-zip');
const download = require('download');
const ora = require('ora');
const axios = require('axios');
const tempFiles = [];

async function init(args) {
  args.repo = args.repo ? args.repo : 'hayes0724/packer-blank-theme';
  const cmd = args._;
  if (cmd.length < 2) {
    throw console.log(chalk.red('Please include a directory to install in'));
  }
  const spinner = ora(chalk.magenta('Initializing new theme...'));
  spinner.start();
  const dir = path.join(process.cwd(), args._[1]);
  const tempfile = path.join(dir, 'temp.zip');

  try {
    const res = await _getLatestRelease(args.repo);
    const tag = res.data.name;
    const release = _getDownloadUrl(args.repo, tag);
    const extracted = _getExtractedName(args.repo, tag, dir);
    await _downloadFile(release, dir);
    await _extractFile(tempfile, dir);
    _cleanUpDownload(extracted, dir, tempfile);
    spinner.succeed('Theme initialized!');
  } catch (e) {
    spinner.fail('There was an error, removing directory now...');
    _removeRecursiveSync(dir);
    console.error(e.message || e);
  }
}

async function _getLatestRelease(repo) {
  return await axios.get(
    `https://api.github.com/repos/${repo}/releases/latest`
  );
}

async function _downloadFile(release, dir) {
  return await download(release, dir, {filename: 'temp.zip'});
}

async function _extractFile(tempfile, dir) {
  return extract(tempfile, {dir: dir});
}

function _getDownloadUrl(repo, tagName) {
  return `https://github.com/${repo}/archive/${tagName}.zip`;
}

function _getExtractedName(repo, tagName, dir) {
  return path.join(dir, `${repo.split('/')[1]}-${tagName.replace('v', '')}`);
}

function _cleanUpDownload(extracted, dir, tempfile) {
  _copyRecursiveSync(extracted, dir);
  tempFiles.reverse().forEach((file) => fs.rmdirSync(file));
  fs.rmdirSync(extracted);
  fs.unlinkSync(tempfile);
}

function _removeRecursiveSync(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        _removeRecursiveSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

function _copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      tempFiles.push(src);
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(function (childItemName) {
      _copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.renameSync(src, dest);
  }
}

const testingFunctions =
  process.env.NODE_ENV !== 'test'
    ? {}
    : {
        _extractFile,
        _getDownloadUrl,
        _getExtractedName,
        _getLatestRelease,
        _cleanUpDownload,
      };

module.exports = {
  init,
  ...testingFunctions,
};
