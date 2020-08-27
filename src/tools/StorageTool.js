const { localStorage } = window;

/**
 *
 *@util localStorage工具，不用再区分引用还是基本类型，统一JSON来存取
 * @by lmh
 * @at 2019/12/20
 *
 */
function StorageTool(storage = localStorage) {
  this.storage = storage;
}

StorageTool.prototype = {
  constructor: StorageTool,
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  },
  get(key, defaultValue) {
    const item = this.storage.getItem(key);
    try {
      const value = item ? JSON.parse(item) : defaultValue;
      return value;
    } catch (err) {
      return defaultValue || undefined;
    }
  },
  remove(key) {
    return this.storage.removeItem(key);
  },
  clear() {
    return this.storage.clear();
  },
  // alias
  setItem(...args) {
    return this.set(...args);
  },
  getItem(...args) {
    return this.get(...args);
  },
  removeItem(...args) {
    return this.remove(...args);
  },
};

const instance = new StorageTool();

export default instance;
