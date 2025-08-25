

import type React from "react"
import { motion } from "framer-motion"
import { MapPin, Thermometer, Calendar } from "lucide-react"
import type { WeatherData } from "../../../services/api/types"

interface WeatherCardProps {
  weather: WeatherData
  onClick?: () => void
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "text-blue-600 bg-blue-50"
    if (temp <= 15) return "text-green-600 bg-green-50"
    if (temp <= 25) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">{weather.city}</h3>
        </div>
      </div>

      <div className="text-center mb-4">
        <div
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getTemperatureColor(weather.temperature)}`}
        >
          <Thermometer className="w-5 h-5" />
          <span className="text-2xl font-bold">{weather.temperature}°C</span>
        </div>
        <p className="text-gray-600 mt-2 capitalize">{weather.condition}</p>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(weather.date)}</span>
      </div>
    </motion.div>
  )
}

export default WeatherCard
