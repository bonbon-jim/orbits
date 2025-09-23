import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { setupErrorListeners } from './services/api';

// 设置错误监听器
setupErrorListeners();

export function render() {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter>
        <AuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AuthProvider>
      </StaticRouter>
    </React.StrictMode>
  );
}
