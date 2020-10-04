const path = require('path');
const fs = require('fs');

function getPackerUserConfig() {
  const packerConfigPath = path.join(process.cwd(), 'packer.config.js');
  if (fs.existsSync(packerConfigPath)) {
    return require(packerConfigPath);
  } else {
    return {};
  }
}

// Fetch the contents of Packer's user config once, and only once
global.packerUserConfig = global.packerUserConfig || getPackerUserConfig();

module.exports = class PackerConfig {
  constructor(schema) {
    this.schema = {...schema};
  }

  get userConfig() {
    return global.packerUserConfig;
  }

  get(key) {
    const defaultValue = this.schema[key];
    const userConfigValue = this.userConfig[key];
    let computedDefaultValue;

    if (
      typeof defaultValue === 'undefined' &&
      typeof userConfigValue === 'undefined'
    ) {
      throw new Error(
        `[packer-config]: A value has not been defined for the key '${key}'`
      );
    }

    if (typeof defaultValue === 'function') {
      computedDefaultValue = defaultValue(this);
    } else {
      computedDefaultValue = defaultValue;
    }

    if (typeof userConfigValue === 'undefined') {
      return computedDefaultValue;
    } else if (typeof userConfigValue === 'function') {
      return userConfigValue(this, computedDefaultValue);
    } else {
      return userConfigValue;
    }
  }

  set(key, value) {
    this.config[key] = value;
  }
};
