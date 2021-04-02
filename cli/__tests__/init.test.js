/* eslint-env jest */
const {
  _extractFile,
  _getLatestRelease,
  _getDownloadUrl,
  _getExtractedName,
  _cleanUpDownload,
} = require('../commands/init');
const fs = require('fs');
const mock = require('mock-fs');
const path = require('path');
const axios = require('axios');

jest.mock('axios');

function getThemeFixture(theme, ext) {
  return fs
    .readdirSync(path.resolve(__dirname, `fixtures`))
    .filter((file) => file.includes(theme))
    .find((file) => file.includes(ext));
}

describe('Test init command', () => {
  let dir, tempfile, response, repo, tagName, theme, themeName;
  beforeEach(() => {
    dir = '/temp';
    themeName = 'packer-blank-theme';
    theme = getThemeFixture(themeName, '.zip');
    tempfile = path.join(dir, theme);
    response = require(`./fixtures/${getThemeFixture(themeName, '.json')}`);
    repo = `hayes0724/${themeName}`;
    tagName = `v${theme.split('-').pop().replace('.zip', '')}`;
    const options = {};
    options['/temp'] = {};
    options['/temp'][theme] = mock.load(
      path.resolve(__dirname, `fixtures/${theme}`)
    );
    mock({
      ...options,
    });
  });
  afterEach(() => {
    mock.restore();
  });
  test('extract file from zip archive', async () => {
    await _extractFile(tempfile, '/temp');
    const result = fs.readdirSync(
      path.join(_getExtractedName(repo, tagName, dir))
    );
    mock.restore();
    expect(result).toMatchSnapshot();
  });
  test('Get the latest release from github', async () => {
    axios.get.mockResolvedValue(response);
    const res = await _getLatestRelease(repo);
    expect(res.data.name).toBe(tagName);
  });
  test('Get the download url', () => {
    const result = _getDownloadUrl(repo, tagName);
    mock.restore();
    expect(result).toMatchSnapshot();
  });
  test('Get the extracted file name', () => {
    const result = _getExtractedName(repo, tagName, dir).split(path.sep);
    mock.restore();
    expect(result).toMatchSnapshot();
  });
  test('Clean up downloaded files', async () => {
    await _extractFile(tempfile, '/temp');
    _cleanUpDownload(_getExtractedName(repo, tagName, dir), dir, tempfile);
    const result = fs.readdirSync(dir);
    mock.restore();
    expect(result).toMatchSnapshot();
  });
});
