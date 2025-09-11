import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  // Remove useLocation hook as it's not compatible with SSR
  // We'll handle active state through CSS or client-side hydration
  const currentSection = 'introduction' // Default value for SSR
  const navigationItems = [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: '📚' },
        { id: 'installation', label: 'Installation', icon: '⚙️' },
        { id: 'quickstart', label: 'Quick Start', icon: '🚀' },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { id: 'components', label: 'Components', icon: '🧩' },
        { id: 'styling', label: 'Styling', icon: '🎨' },
        { id: 'theming', label: 'Theming', icon: '🌈' },
      ]
    },
    {
      title: 'Components',
      items: [
        { id: 'buttons', label: 'Buttons', icon: '🔘' },
        { id: 'forms', label: 'Forms', icon: '📝' },
        { id: 'cards', label: 'Cards', icon: '🃏' },
        { id: 'modals', label: 'Modals', icon: '📱' },
      ]
    },
    {
      title: 'Utilities',
      items: [
        { id: 'layout', label: 'Layout', icon: '📐' },
        { id: 'spacing', label: 'Spacing', icon: '↔️' },
        { id: 'colors', label: 'Colors', icon: '🎨' },
      ]
    }
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Documentation
          </h2>
        </div>
        
        {navigationItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/project/${item.id}`}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors ${
                      currentSection === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
