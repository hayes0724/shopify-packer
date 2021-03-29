const {createServer} = require('https');
const webpack = require('webpack');
const App = require('../app');
const Client = require('../client');
const createHash = require('crypto').createHash;
const {sslKeyCert} = require('../ssl');
const isHotUpdateFile = require('../is-hot-update-file');
const PackerConfig = require('../../config');
const config = new PackerConfig(require('../../../packer.schema'));
const path = require('path');

module.exports = class AssetServer {
  constructor(options) {
    options.webpackConfig.output.publicPath = `https://${options.address}:${options.port}/`;
    this.assetHashes = new Map();
    this.updates = new Set();
    this.address = options.address;
    this.options = options;
    this.port = options.port;
    this.compiler = webpack(options.webpackConfig);
    this.app = new App(this.compiler);
    this.client = new Client();
    this.client.hooks.afterSync.tap(
      'HotMiddleWare',
      this._onAfterSync.bind(this)
    );
  }

  start() {
    this.compiler.hooks.done.tap('DevServer', this._onCompileDone.bind(this));
    this.compiler.hooks.assetEmitted.tap(
      'DevServer',
      this._onAssetEmit.bind(this)
    );

    this.ssl = sslKeyCert();
    this.server = createServer(this.ssl, this.app);

    this.server.listen(this.port);
  }

  set files(files) {
    this.client.files = files;
  }

  set skipDeploy(value) {
    this.client.skipNextSync = value;
  }

  _onAssetEmit(file, info) {
    if (this._isLiquidStyle(file) && this._hasAssetChanged(file, info)) {
      return this.updates.add(`assets/${file}`);
    }
    if (this._isLiquidTagFile(file) && this._hasAssetChanged(file, info)) {
      return this.updates.add(`snippets/${path.basename(file)}`);
    }
    if (this._isLiquidFile(file) && this._hasAssetChanged(file, info)) {
      return this.updates.add(
        file.replace(`..${path.sep}`, '').replace(`../`, '')
      );
    }
    if (this._isAssetFile(file) && this._hasAssetChanged(file, info)) {
      return this.updates.add(`assets/${file}`);
    }
  }

  _onCompileDone(stats) {
    const files = [...this.updates];
    this.updates.clear();
    this.files = [...files];
    return this.client.sync(files, stats);
  }

  _onAfterSync(files) {
    const _syncHandler = () => {
      this.app.webpackHotMiddleware.publish({
        action: 'shopify_upload_finished',
        force: files.length > 0,
      });
    };
    setTimeout(_syncHandler, parseInt(config.get('network.reload')));
  }

  _isLiquidStyle(key) {
    return key.indexOf('styleLiquid.css.liquid') > -1;
  }

  _isLiquidFile(file) {
    return (
      !this._isLiquidStyle(file) &&
      !this._isLiquidTagFile(file) &&
      file.includes('.liquid')
    );
  }

  _isLiquidTagFile(file) {
    return (
      file.includes('style-tags.liquid') || file.includes('script-tags.liquid')
    );
  }

  _isAssetFile(file) {
    return (
      !this._isLiquidFile(file) &&
      !isHotUpdateFile(file) &&
      !file.includes('.js') &&
      !file.includes('.gitkeep')
    );
  }

  _hasAssetChanged(key, info) {
    const oldHash = this.assetHashes.get(key);
    const newHash = this._updateAssetHash(key, info);
    return oldHash !== newHash;
  }

  _updateAssetHash(key, info) {
    //const rawSource = info.content;
    //const source = Array.isArray(rawSource) ? rawSource.join('\n') : rawSource;
    const hash = createHash('sha256').update(info.content).digest('hex');
    this.assetHashes.set(key, hash);
    return hash;
  }
};
