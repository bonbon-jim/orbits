import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // 登录成功，关闭模态框
        onClose();
        
        // 如果有重定向路径，则重定向
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectPath;
        }
      } else {
        setError(result.error || '登录失败');
      }
    } catch (err) {
      setError(err.message || '登录过程中发生错误');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle className="text-center font-bold">
          登录交易平台
        </DialogTitle>
        
        <DialogContent>
          <Box className="space-y-4">
            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="邮箱地址"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mb-4"
            />
            
            <TextField
              fullWidth
              label="密码"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            
            <Box className="text-sm text-gray-600">
              <p>演示账号：任意邮箱和密码均可登录</p>
              <p>权限：交易权限、查看价格权限</p>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions className="px-6 pb-4">
          <Button 
            onClick={handleClose} 
            disabled={loading}
            variant="outlined"
          >
            取消
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !email || !password}
            startIcon={loading && <CircularProgress size={16} />}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal;
