const LocalStorageController = {
  
  /**
   * Stores an item in local storage with an expiration time.
   *
   * @param {string} key - The key under which the item is stored.
   * @param {*} value - The value to be stored.
   * @param {number} [expiryTimeInMs=300000] - The time in milliseconds after which the item expires.
   */
  setWithExpiry: (key, value, expiryTimeInMs = 300000) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expiryTimeInMs,
    };

    localStorage.setItem(key, JSON.stringify(item));
  },
  /** 
   * Retrieves an item from local storage by key, checking if it has expired.
   * If the item has expired, it is removed from local storage and null is returned.
   *
   * @param {string} key - The key of the item to retrieve from local storage.
   * @returns {*} The value of the item if it exists and has not expired, otherwise null.
   */
  getWithExpiry:  (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
  },
};

export default LocalStorageController;