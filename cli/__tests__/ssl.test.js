/* eslint-env jest */
const ssl = require('../commands/ssl');
const mock = require('mock-fs');
const fs = require('fs');
const os = require('os');
const path = require('path');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

describe('Test ssl command', () => {
  beforeEach(() => {
    // Start with an empty file system
    const home = `${os.homedir()}/.localhost_ssl`;
    mock({
      [home]: {},
    });
  });
  test('ssl:make creates some files in .localhost_ssl', async () => {
    await ssl({make: true});
    const result = fs.readdirSync(path.join(os.homedir(), '.localhost_ssl'));
    mock.restore();
    expect(result).toMatchSnapshot();
  });
});
