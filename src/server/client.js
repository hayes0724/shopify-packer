const {SyncHook, AsyncSeriesHook} = require('tapable');

const {sync} = require('./sync');

module.exports = class Client {
  constructor(options) {
    this.options = {...this.defaults, ...options};
    this.skipNextSync = false;
    this.files = [];
    this.hooks = {
      beforeSync: new AsyncSeriesHook(['files', 'stats']),
      sync: new SyncHook(['files', 'stats']),
      syncDone: new SyncHook(['files', 'stats']),
      afterSync: new AsyncSeriesHook(['files', 'stats']),
      syncSkipped: new SyncHook(['files', 'stats']),
    };
  }

  async sync(files, stats) {
    this.files = [...files];

    await this.hooks.beforeSync.promise(this.files, stats);

    if (this.files.length === 0) {
      this.skipNextSync = true;
    }

    if (this.skipNextSync) {
      this.hooks.syncSkipped.call(this.files, stats);
    } else {
      this.hooks.sync.call(this.files, stats);
      sync(this.files)
        .then(() => this.hooks.syncDone.call(this.files, stats))
        .catch((e) => console.error(e.message || e));
    }

    await this.hooks.afterSync.promise(this.files, stats);

    this.skipNextSync = false;
  }

  skipNextSync() {
    this.skipSync = true;
  }
};
