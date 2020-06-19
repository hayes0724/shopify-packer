const editJsonFile = require("edit-json-file");
const Environment = require('../utilities/enviroment');
const paths = require('../utilities/paths').config;

module.exports = class Manager {
    constructor() {
        /** @type {JsonEditor} */
        this.file = editJsonFile(paths.settings, {});
        this.env = Environment.getEnvNameValue();
    }
    getConfig() {
        return this.file.toObject()
    }
    setId(id) {
        this.file.set(`themes.${this.env}.id`, id);
        this.file.save();
    }
}