// 在任何组件中使用
import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const MyComponent = () => {
  const { showError, showSuccess, showWarning, showInfo } = useNotification();

  const handleApiCall = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('API 请求失败');
      }
      const data = await response.json();
      showSuccess('数据获取成功！' + data);
    } catch (error) {
      showError(`错误: ${error.message}`, {
        title: 'API 错误',
        duration: 8000 // 8秒后自动关闭
      });
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>调用API</button>
      <button onClick={() => showInfo('这是一条信息')}>显示信息</button>
      <button onClick={() => showWarning('注意！')}>显示警告</button>
    </div>
  );
};