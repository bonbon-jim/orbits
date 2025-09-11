import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:section" element={
          <div className="flex">
            <Sidebar />
            <MainContent />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
