import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  Typography
} from '@mui/material';
import { Warning } from '@mui/icons-material';

const PermissionError = ({ open, onClose, requiredPermission }) => {
  const getPermissionDescription = (permission) => {
    const descriptions = {
      'trade': '执行交易操作',
      'view_prices': '查看实时价格',
      'withdraw': '提现资金',
      'deposit': '充值资金',
      'admin': '管理权限'
    };
    
    return descriptions[permission] || permission;
  };

  const handleRequestPermission = () => {
    // 模拟权限申请流程
    alert('权限申请功能已触发！在实际应用中，这里会连接到权限管理系统。');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center font-bold flex items-center justify-center space-x-2">
        <Warning color="warning" />
        <span>权限不足</span>
      </DialogTitle>
      
      <DialogContent>
        <Box className="space-y-4">
          <Alert severity="warning" className="mb-4">
            您没有访问此页面的必要权限
          </Alert>
          
          <Box className="bg-gray-50 p-4 rounded-lg">
            <Typography variant="body2" className="font-semibold mb-2">
              需要的权限：
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              {getPermissionDescription(requiredPermission)}
            </Typography>
          </Box>
          
          <Box className="bg-blue-50 p-4 rounded-lg">
            <Typography variant="body2" className="font-semibold mb-2">
              如何获取权限？
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              1. 联系系统管理员申请相应权限<br/>
              2. 确保您的账户已完成身份验证<br/>
              3. 可能需要满足特定的交易经验要求
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions className="px-6 pb-4">
        <Button onClick={onClose} variant="outlined">
          关闭
        </Button>
        <Button
          onClick={handleRequestPermission}
          variant="contained"
          color="primary"
        >
          申请权限
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionError;
