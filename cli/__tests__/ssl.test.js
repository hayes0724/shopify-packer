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
    mock({});
  });
  afterEach(() => {
    mock.restore();
  });
  test('ssl:make creates some files in .localhost_ssl', (done) => {
    ssl({make: true})
      .then(() => {
        assertSnapshot(path.join(os.homedir(), '.localhost_ssl'));
      })
      .then(done);
  });
});

function assertSnapshot(dir) {
  const result = fs.readdirSync(dir);
  mock.restore();
  expect(result).toMatchSnapshot();
}
