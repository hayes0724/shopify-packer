# PackerConfig

Handles all of Packer's configurable options. Packer packages can declare options in schema files and access the default values of these options in their code. Packer Config will also look for a `packer.config.js` file in the root of a Packer theme project and use any key/values declared in it to override default values declared in Packer packages.

### Example Schema

The format of Packer configurations relies on a flat object structure using unique keys to access each of its configuration items.

```js
const path = require('path');
const commonPaths = require('./common-paths');

module.exports = {
  // You can divide your config items across multiple files, import them, and then
  // spread them into your main config schema. Packer Config comes with common
  // config items like paths which might be used in any Packer package.
  ...commonPaths,

  // Configuration values can be set directly
  'webpack.babel.enable': true,

  // Or computed when the schema file is require()'d by another file
  'paths.theme': process.cwd(),

  // Or even computed when requested by Packer Config's .get() method. This allows
  // configuration items to access other configuration items. The argument passed
  // to the function is an instance of the PackerConfig() class.
  'paths.theme.src': config => path.join(config.get('paths.theme'), 'src'),
};
```

### Methods

#### PackerConfig(schema)

The main class constructor which consumes a config schema and returns a config instance.

```
const PackerConfig = require('/src/config');
const config = new PackerConfig(require('./packer.schema'));
```

#### PackerConfig.prototype.get(key)

Fetches the value of a given config item, and throws an error if the item does not exist

```
const themeRoot = config.get('paths.theme');
```

#### PackerConfig.prototype.set(key, value, override)

Sets the value of config item, and throws an error in the key already has a value set to it, unless the override boolean is set to true.

```
config.set('newKey', 'newValue'); // Sets new key in your config instance
config.set('existingKey', 'someValue'); // Throws an error because key already exists
config.set('existingKey', 'newValue', true); // Doesn't throw an error because override is set to true
```

### Testing

Generally, it's considered a best practice to add unit tests to any configuration items you use in your code to catch any future unintentional regressions. To test a configuration item, you can modify the global object used to normally store `packer.config.js` values:

```
global.packerUserConfig['paths.theme'] = 'some/new/path/for/testing'
```
