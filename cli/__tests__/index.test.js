const help = require('../commands/help');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

describe('Test help command', () => {
  test('help does not throw error', () => {
    expect(help).not.toThrow();
  });
});
