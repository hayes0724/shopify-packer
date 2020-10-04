const path = require('path');

const originalCwd = process.cwd();
const schema = {
  'some.key': 'someValue',
  'some.other.key': 'someOtherValue',
  'some.function': jest.fn((config) => config.get('some.other.key')),
};

beforeEach(() => {
  process.chdir(originalCwd);
  global.packerUserConfig = null;
  global.packerConfigPath = null;
  jest.resetModules();
});

describe('when the file first is executed it', () => {
  test('looks for packer.config.js in process.cwd and assigns its contents to a global variable global.packerUserConfig', () => {
    process.chdir(path.resolve(__dirname, './fixtures'));

    const userConfig = require('./fixtures/packer.config');

    require('../index');

    expect(global.packerUserConfig).toBeDefined();
    expect(global.packerUserConfig).toMatchObject(userConfig);
  });

  test('looks for a packer.config.js file if global.packerConfigPath is defined', () => {
    global.packerConfigPath = path.resolve(
      __dirname,
      'fixtures/packer.config.js'
    );

    const userConfig = require('./fixtures/packer.config');

    require('../index');

    expect(global.packerUserConfig).toBeDefined();
    expect(global.packerUserConfig).toMatchObject(userConfig);
  });

  test('if packer.config.js does not exist at process.cwd or the value specified by global.packerConfigPath, an empty object is returned', () => {
    require('../index');

    expect(global.packerUserConfig).toBeDefined();
    expect(global.packerUserConfig).toMatchObject({});
  });

  test('throws error if there is an error in the packer.config.js file', () => {
    global.packerConfigPath = path.resolve(
      __dirname,
      'fixtures/packerWithError.config.js'
    );

    expect(() => {
      require('../index');
    }).toThrowError(ReferenceError);
  });
});

describe('PackerConfig()', () => {
  test('requires a first argument which is assigned to this.schema', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    expect(config.schema).toMatchObject(schema);
    expect(() => new PackerConfig()).toThrowError();
  });

  test('PackerConfig.prototype.userConfig is a shortcut to global.packerUserConfig', () => {
    process.chdir(path.resolve(__dirname, './fixtures'));

    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    expect(config.userConfig).toMatchObject(global.packerUserConfig);
  });

  test('does not modify the original schema object', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    config.get('some.function');

    expect(config.schema).not.toBe(schema);
  });
});

describe('PackerConfig.get()', () => {
  test('fetches the value of the provided key', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    expect(config.get('some.other.key')).toBe(schema['some.other.key']);
  });

  test('if the value is a function and not specified in this.userConfig, the function is executed with the config instance as the only argument', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);
    const value = config.get('some.function');

    expect(schema['some.function']).toBeCalledWith(config);
    expect(value).toBe(schema['some.other.key']);
  });

  test('if the value is specified in this.userConfig and is a function, it is executed with the config instance and the computed default value as arguments', () => {
    const userConfigValue = 'someNewValue';
    const userConfigFunction = jest.fn(() => userConfigValue);

    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);
    const defaultValue = config.get('some.function');

    global.packerUserConfig = {
      'some.function': userConfigFunction,
    };

    const value = config.get('some.function');

    expect(global.packerUserConfig['some.function']).toBeCalledWith(
      config,
      defaultValue
    );
    expect(value).toBe(userConfigValue);
  });
});

describe('PackerConfig.set()', () => {
  test('sets the value of a config for a given key', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    config.set('some.new.key', 'someNewValue');

    expect(config.schema['some.new.key']).toBe('someNewValue');
  });

  test('throws an error if key has already been set, unless override boolean has been explicitely set', () => {
    const PackerConfig = require('../index');
    const config = new PackerConfig(schema);

    expect(() => config.set('some.key', 'someOtherValue')).toThrowError();
  });
});
