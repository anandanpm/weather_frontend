import type React from "react"
import { motion } from "framer-motion"
import { History } from "lucide-react"
import WeatherCard from "../WeatherCard/WeatherCard"
import type { WeatherData } from "../../../services/api/types"
import "./WeatherHistory.scss"

interface WeatherHistoryProps {
  weatherHistory: WeatherData[]
  loading?: boolean
  onClear?: () => void
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({
  weatherHistory,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="weather-history">
        <div className="weather-history__header">
          <h2 className="weather-history__title">
            <History className="weather-history__icon" />
            <span>Weather History</span>
          </h2>
        </div>
        <div className="weather-history__loading">
          <p>Loading history...</p>
        </div>
      </div>
    )
  }

  if (weatherHistory.length === 0) {
    return (
      <div className="weather-history">
        <div className="weather-history__header">
          <h2 className="weather-history__title">
            <History className="weather-history__icon" />
            <span>Weather History</span>
          </h2>
        </div>
        <div className="weather-history__empty">
          <p>No weather history available. Search for a city to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-history">
      <div className="weather-history__header">
        <h2 className="weather-history__title">
          <History className="weather-history__icon" />
          <span>Weather History ({weatherHistory.length})</span>
        </h2>
       
      </div>

      <motion.div
        className="weather-history__grid"
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
