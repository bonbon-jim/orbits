import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ExchangeHome from './pages/Exchange/ExchangeHome'
import TradePage from './pages/Exchange/TradePage'
import ProtectedRoute from './components/Exchange/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/project/:section" element={
          <div className="flex">
            <Sidebar />
            <MainContent />
          </div>
        } />
        {/* 交易所路由 */}
        <Route path="/exchange" element={<ExchangeHome />} />
        <Route path="/exchange/trade/:symbol" element={
          <ProtectedRoute requiredPermission="trade">
            <TradePage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
