// LocalStorage 工具函数

// 币种设置相关
export const CryptoStorage = {
  // 获取币种设置
  getCryptoSetting: (symbol) => {
    try {
      const settings = localStorage.getItem(`crypto_${symbol}_settings`);
      return settings ? JSON.parse(settings) : {
        autoRefresh: false,
        refreshInterval: 30
      };
    } catch (error) {
      console.error('Failed to get crypto settings:', error);
      return {
        autoRefresh: false,
        refreshInterval: 30
      };
    }
  },

  // 保存币种设置
  setCryptoSetting: (symbol, settings) => {
    try {
      localStorage.setItem(`crypto_${symbol}_settings`, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Failed to save crypto settings:', error);
      return false;
    }
  },

  // 获取所有币种设置
  getAllCryptoSettings: () => {
    const settings = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('crypto_') && key.endsWith('_settings')) {
        try {
          const symbol = key.replace('crypto_', '').replace('_settings', '');
          settings[symbol] = JSON.parse(localStorage.getItem(key));
        } catch (error) {
          console.error('Failed to parse settings for key:', key, error);
        }
      }
    }
    return settings;
  },

  // 清除特定币种设置
  clearCryptoSetting: (symbol) => {
    try {
      localStorage.removeItem(`crypto_${symbol}_settings`);
      return true;
    } catch (error) {
      console.error('Failed to clear crypto settings:', error);
      return false;
    }
  },

  // 清除所有币种设置
  clearAllCryptoSettings: () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('crypto_') && key.endsWith('_settings')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Failed to remove key:', key, error);
      }
    });
    
    return keysToRemove.length;
  }
};

// 用户相关
export const UserStorage = {
  // 获取用户信息
  getUser: () => {
    try {
      const user = localStorage.getItem('exchange_user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  },

  // 保存用户信息
  setUser: (user) => {
    try {
      localStorage.setItem('exchange_user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Failed to save user:', error);
      return false;
    }
  },

  // 获取token
  getToken: () => {
    try {
      return localStorage.getItem('exchange_token');
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  },

  // 保存token
  setToken: (token) => {
    try {
      localStorage.setItem('exchange_token', token);
      return true;
    } catch (error) {
      console.error('Failed to save token:', error);
      return false;
    }
  },

  // 清除用户信息
  clearUser: () => {
    try {
      localStorage.removeItem('exchange_user');
      localStorage.removeItem('exchange_token');
      return true;
    } catch (error) {
      console.error('Failed to clear user:', error);
      return false;
    }
  },

  // 检查是否已登录
  isLoggedIn: () => {
    return !!UserStorage.getUser() && !!UserStorage.getToken();
  }
};

// 交易相关
export const TradeStorage = {
  // 保存交易历史
  saveTradeHistory: (trade) => {
    try {
      const history = TradeStorage.getTradeHistory();
      history.unshift({
        ...trade,
        timestamp: new Date().toISOString(),
        id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });
      
      // 只保留最近100条记录
      const limitedHistory = history.slice(0, 100);
      localStorage.setItem('trade_history', JSON.stringify(limitedHistory));
      return true;
    } catch (error) {
      console.error('Failed to save trade history:', error);
      return false;
    }
  },

  // 获取交易历史
  getTradeHistory: () => {
    try {
      const history = localStorage.getItem('trade_history');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to get trade history:', error);
      return [];
    }
  },

  // 清除交易历史
  clearTradeHistory: () => {
    try {
      localStorage.removeItem('trade_history');
      return true;
    } catch (error) {
      console.error('Failed to clear trade history:', error);
      return false;
    }
  }
};

// 通用工具函数
export const StorageUtils = {
  // 安全地获取数据
  safeGet: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Failed to get item for key ${key}:`, error);
      return defaultValue;
    }
  },

  // 安全地设置数据
  safeSet: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to set item for key ${key}:`, error);
      return false;
    }
  },

  // 安全地移除数据
  safeRemove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item for key ${key}:`, error);
      return false;
    }
  },

  // 检查存储空间
  checkStorageSpace: () => {
    try {
      const testData = 'test'.repeat(250000); // 1MB测试数据
      localStorage.setItem('test_storage', testData);
      localStorage.removeItem('test_storage');
      return true;
    } catch (error) {
      console.warn('LocalStorage may be full or not available');
      return false;
    }
  },

  // 获取存储使用情况
  getStorageUsage: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
};

export default {
  CryptoStorage,
  UserStorage,
  TradeStorage,
  StorageUtils
};
