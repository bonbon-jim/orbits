import React from 'react'

const MainContent = () => {
  // Remove useParams hook as it's not compatible with SSR
  // We'll handle this through props or client-side hydration
  const activeSection = 'introduction' // Default value for SSR
  const content = {
    introduction: {
      title: "Introduction to Orbits UI",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Orbits UI is a modern, accessible, and customizable component library built with React and Tailwind CSS. 
            It provides a comprehensive set of components to help you build beautiful and functional user interfaces.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-700">
              <strong>Tip:</strong> Orbits UI is designed to work seamlessly with Tailwind CSS, giving you full control over styling while providing sensible defaults.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Fully accessible components following WAI-ARIA guidelines</li>
            <li>Customizable theming with Tailwind CSS</li>
            <li>TypeScript support out of the box</li>
            <li>Responsive design for all screen sizes</li>
            <li>Comprehensive documentation and examples</li>
          </ul>
        </div>
      )
    },
    installation: {
      title: "Installation",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Install via npm</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">npm install orbits-ui</code>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Or using yarn</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">yarn add orbits-ui</code>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Peer Dependencies</h2>
          <p className="text-gray-700">
            Orbits UI requires React and Tailwind CSS to be installed in your project:
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">
              npm install react react-dom tailwindcss
            </code>
          </div>
        </div>
      )
    },
    quickstart: {
      title: "Quick Start",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">1. Import Components</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">
              {`import { Button, Card } from 'orbits-ui'`}
            </code>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">2. Use in Your App</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">
              {`function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card title="Welcome">Hello World!</Card>
    </div>
  )
}`}
            </code>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">3. Configure Tailwind</h2>
          <p className="text-gray-700">
            Make sure to include Orbits UI in your Tailwind config:
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm">
              {`module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/orbits-ui/**/*.{js,jsx,ts,tsx}'
  ],
  // ... rest of your config
}`}
            </code>
          </div>
        </div>
      )
    },
    buttons: {
      title: "Buttons",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Primary
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Secondary
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
              Outline
            </button>
            <button className="text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Ghost
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Button Sizes</h2>
          <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
            <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
              Small
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Medium
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
              Large
            </button>
          </div>
        </div>
      )
    },
    forms: {
      title: "Forms",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Form Components</h2>
          <div className="p-6 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </div>
      )
    }
  }

  const currentContent = content[activeSection] || content.introduction

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {currentContent.title}
        </h1>
        {currentContent.content}
      </div>
    </main>
  )
}

export default MainContent
