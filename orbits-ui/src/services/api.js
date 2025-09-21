// API服务层，包含请求拦截器和错误处理
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// 模拟币种价格数据
const mockCryptoData = {
  bitcoin: {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45000 + Math.random() * 2000,
    change: (Math.random() - 0.5) * 10,
    volume: 25000000000,
    marketCap: 850000000000,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 44000 + Math.random() * 3000
    }))
  },
  ethereum: {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2500 + Math.random() * 200,
    change: (Math.random() - 0.5) * 8,
    volume: 15000000000,
    marketCap: 300000000000,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 2400 + Math.random() * 300
    }))
  },
  solana: {
    symbol: 'SOL',
    name: 'Solana',
    price: 100 + Math.random() * 20,
    change: (Math.random() - 0.5) * 15,
    volume: 3000000000,
    marketCap: 40000000000,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 90 + Math.random() * 30
    }))
  }
};

// 请求拦截器
const requestInterceptor = (config) => {
  const token = localStorage.getItem('exchange_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 响应拦截器 - 处理401和403错误
const responseInterceptor = (response) => {
  return response;
};

const handleError = (error) => {
  if (error.response) {
    const { status } = error.response;
    
    if (status === 401) {
      // 未授权，触发登录模态框
      localStorage.removeItem('exchange_user');
      localStorage.removeItem('exchange_token');
      window.dispatchEvent(new CustomEvent('authError', { detail: { type: 'unauthorized' } }));
    } else if (status === 403) {
      // 权限不足，触发权限错误提示
      window.dispatchEvent(new CustomEvent('authError', { detail: { type: 'forbidden' } }));
    }
  }
  return Promise.reject(error);
};

// 封装fetch请求
const apiRequest = async (url, options = {}) => {
  try {
    let config = { ...options };
    config = requestInterceptor(config);
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    });

    const processedResponse = responseInterceptor(response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

// API方法
export const api = {
  // 获取币种价格列表
  getCryptoPrices: async () => {
    // 模拟API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        // 更新价格数据
        Object.keys(mockCryptoData).forEach(key => {
          mockCryptoData[key].price += (Math.random() - 0.5) * 100;
          mockCryptoData[key].change = (Math.random() - 0.5) * 10;
        });
        resolve(mockCryptoData);
      }, 500);
    });
  },

  // 获取单个币种详情
  getCryptoDetail: async (symbol) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const crypto = mockCryptoData[symbol.toLowerCase()];
        if (crypto) {
          resolve(crypto);
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // 登录
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: 1,
              email: credentials.email,
              name: '交易用户',
              role: 'trader',
              permissions: ['trade', 'view_prices']
            },
            token: 'mock_jwt_token_' + Date.now()
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // 交易操作（模拟）
  executeTrade: async (tradeData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: 'ORDER_' + Date.now(),
          ...tradeData
        });
      }, 2000);
    });
  }
};

// 错误事件监听器
export const setupErrorListeners = () => {
  window.addEventListener('authError', (event) => {
    const { type } = event.detail;
    if (type === 'unauthorized') {
      // 触发登录模态框显示
      window.dispatchEvent(new CustomEvent('showLoginModal'));
    } else if (type === 'forbidden') {
      // 触发权限错误提示
      window.dispatchEvent(new CustomEvent('showPermissionError'));
    }
  });
};

export default api;
