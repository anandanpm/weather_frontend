import type React from "react"
import { Cloud } from "lucide-react"

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Cloud className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Weather Dashboard</h1>
          </div>
          <p className="text-sm text-gray-600 hidden sm:block">Real-time weather data with smart caching</p>
        </div>
      </div>
    </header>
  )
}

export default Header
