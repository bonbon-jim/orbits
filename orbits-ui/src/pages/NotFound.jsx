import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">页面未找到</h2>
          <p className="text-gray-500 mb-8">抱歉，您访问的页面不存在或已被移除。</p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            返回首页
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>或者</p>
            <Link 
              to="/project/introduction" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              查看文档
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
