const { ActionsObservable } = require('redux-observable');

ActionsObservable.prototype._check_ = function(callback) {
  return this.do(callback);
};

let actionMap = {};

const EpicTracker = {
  check(action, meta) {
    if (Array.isArray(actionMap[action]))
      return actionMap[action].push(meta.epic);
    actionMap[action] = [meta.epic];
  },
  getActions() {
    return actionMap;
  },
};

module.exports = EpicTracker;
