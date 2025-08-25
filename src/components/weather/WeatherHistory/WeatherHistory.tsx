"use client"

import type React from "react"
import { motion } from "framer-motion"
import { History, Trash2 } from "lucide-react"
import WeatherCard from "../WeatherCard/WeatherCard"
import type { WeatherData } from "../../../services/api/types"

interface WeatherHistoryProps {
  weatherHistory: WeatherData[]
  loading?: boolean
  onClear?: () => void
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({ weatherHistory, loading = false, onClear }) => {
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <History className="w-6 h-6 text-blue-600" />
            <span>Weather History</span>
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    )
  }

  if (weatherHistory.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <History className="w-6 h-6 text-blue-600" />
            <span>Weather History</span>
          </h2>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No weather history available. Search for a city to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <History className="w-6 h-6 text-blue-600" />
          <span>Weather History ({weatherHistory.length})</span>
        </h2>
        {onClear && (
          <button
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            onClick={onClear}
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {weatherHistory.map((weather, index) => (
          <motion.div
            key={weather._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <WeatherCard weather={weather} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default WeatherHistory
