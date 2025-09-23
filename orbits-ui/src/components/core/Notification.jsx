// components/Notification.jsx
import React from 'react';

const Notification = ({ notification, onClose }) => {
  const { type, message, title } = notification;

  const getIcon = () => {
    switch (type) {
      case 'error': return '❌';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '';
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-header">
        <span className="notification-icon">{getIcon()}</span>
        {title && <span className="notification-title">{title}</span>}
        <button className="notification-close" onClick={onClose}>×</button>
      </div>
      <div className="notification-body">
        {message}
      </div>
    </div>
  );
};

export default Notification;