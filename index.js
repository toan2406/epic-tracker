const fs = require('fs');
const { ActionsObservable } = require('redux-observable');

ActionsObservable.prototype._check_ = function(callback) {
  return this.do(callback);
};

const filename = `${process.cwd()}/epic-tracker.json`;

const EpicTracker = {
  check(action, meta) {
    const log = require(filename);
    if (Array.isArray(log[action])) {
      if (log[action].indexOf(meta.epic) === -1) {
        log[action].push(meta.epic);
      }
    } else {
      log[action] = [meta.epic];
    }
    fs.writeFileSync(filename, JSON.stringify(log));
  },
  getActions() {
    const log = require(filename);
    return log;
  },
  reset() {
    fs.writeFileSync(filename, '{}');
  },
};

module.exports = EpicTracker;
