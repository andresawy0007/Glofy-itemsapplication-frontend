const LocalStorageController = {
  
  // Fetch all items with pagination
  setWithExpiry: (key, value, expiryTimeInMs = 300000) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expiryTimeInMs, // Tiempo actual + duración en ms
    };

    localStorage.setItem(key, JSON.stringify(item));
  },

  // Fetch a single item by ID
  getWithExpiry:  (key) => {
    const itemStr = localStorage.getItem(key);
    // Si el item no existe, devolvemos null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // Comprobamos si el tiempo ha expirado
    if (now.getTime() > item.expiry) {
        // Si ha expirado, lo eliminamos del localStorage
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
  },
};

export default LocalStorageController;