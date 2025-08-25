
import type React from "react"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  loading?: boolean
  placeholder?: string
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onSearch,
  loading = false,
  placeholder = "Enter city name...",
}) => {
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <motion.form
      className="w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 min-w-[120px]"
          disabled={loading || !city.trim()}
        >
          <Search className="w-5 h-5" />
          <span>{loading ? "Searching..." : "Search"}</span>
        </button>
      </div>
    </motion.form>
  )
}

export default WeatherSearch
