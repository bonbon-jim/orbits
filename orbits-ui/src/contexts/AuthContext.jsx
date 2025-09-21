import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查localStorage中是否有用户信息
    const storedUser = localStorage.getItem('exchange_user');
    const storedToken = localStorage.getItem('exchange_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // 模拟登录API调用
      // 在实际应用中，这里应该调用真实的登录API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 1,
              email: email,
              name: '交易用户',
              role: 'trader',
              permissions: ['trade', 'view_prices']
            },
            token: 'mock_jwt_token_' + Date.now()
          });
        }, 1000);
      });

      setUser(response.user);
      localStorage.setItem('exchange_user', JSON.stringify(response.user));
      localStorage.setItem('exchange_token', response.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('exchange_user');
    localStorage.removeItem('exchange_token');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
