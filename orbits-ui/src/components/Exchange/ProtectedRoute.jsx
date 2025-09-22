import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import PermissionError from './PermissionError';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showPermissionError, setShowPermissionError] = React.useState(false);

  React.useEffect(() => {
    // 监听全局错误事件
    const handleAuthError = (event) => {
      if (event.detail.type === 'unauthorized') {
        setShowLoginModal(true);
      } else if (event.detail.type === 'forbidden') {
        setShowPermissionError(true);
      }
    };

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleShowPermissionError = () => setShowPermissionError(true);

    window.addEventListener('authError', handleAuthError);
    window.addEventListener('showLoginModal', handleShowLoginModal);
    window.addEventListener('showPermissionError', handleShowPermissionError);

    return () => {
      window.removeEventListener('authError', handleAuthError);
      window.removeEventListener('showLoginModal', handleShowLoginModal);
      window.removeEventListener('showPermissionError', handleShowPermissionError);
    };
  }, []);

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
    return <PermissionError open={true} onClose={() => {}} requiredPermission={requiredPermission} />;
  }

  // 如果已认证且有权限，直接渲染子组件
  return children;
};

export default ProtectedRoute;
