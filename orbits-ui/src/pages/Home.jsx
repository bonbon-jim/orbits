import React from 'react';

const Home = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎使用 Orbits 产品</h1>
          <p className="text-xl text-gray-600">创新的解决方案，为您提供卓越的用户体验</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">高性能</h3>
            <p className="text-gray-600">快速响应的架构设计，确保流畅的用户体验</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-green-600 text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3">安全可靠</h3>
            <p className="text-gray-600">多重安全防护机制，保障您的数据安全</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-purple-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">易于使用</h3>
            <p className="text-gray-600">直观的用户界面，简单易用的操作流程</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">主要特性</h2>
          <ul className="space-y-2">
            <li>• 现代化的用户界面设计</li>
            <li>• 响应式布局，支持多设备</li>
            <li>• 强大的数据处理能力</li>
            <li>• 实时数据同步</li>
            <li>• 可扩展的插件系统</li>
            <li>• 详细的统计分析</li>
          </ul>
        </div>

        <div className="mt-12 text-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200">
            立即开始使用
          </button>
          <a 
            href="/introduction" 
            className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
          >
            查看文档
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
