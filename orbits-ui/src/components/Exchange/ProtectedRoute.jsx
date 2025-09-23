import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth();
  const location = useLocation();
  const { showModal } = useModal();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 检查是否已认证
  if (!isAuthenticated) {
    // 保存当前路径，登录后可以重定向回来
    const from = location.pathname + location.search;
    localStorage.setItem('redirectAfterLogin', from);
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 检查权限
  if (requiredPermission && !hasPermission(requiredPermission)) {
    showModal('permissionError', { requiredPermission });
    return null;
  }

  // 如果已认证且有权限，直接渲染子组件
  return children;
};

export default ProtectedRoute;
