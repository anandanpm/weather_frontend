
import type React from "react"
import { motion } from "framer-motion"
import { MapPin, Thermometer, Calendar } from "lucide-react"
import type { WeatherData } from "../../../services/api/types"
import "./WeatherCard.scss"

interface WeatherCardProps {
  weather: WeatherData
  onClick?: () => void
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "cold"
    if (temp <= 15) return "cool"
    if (temp <= 25) return "warm"
    return "hot"
  }

  return (
    <motion.div
      className="weather-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="weather-card__header">
        <div className="weather-card__location">
          <MapPin className="weather-card__icon" />
          <h3 className="weather-card__city">{weather.city}</h3>
        </div>
      </div>

      <div className="weather-card__main">
        <div
          className={`weather-card__temperature weather-card__temperature--${getTemperatureColor(weather.temperature)}`}
        >
          <Thermometer className="weather-card__temp-icon" />
          <span className="weather-card__temp-value">{weather.temperature}°C</span>
        </div>
        <p className="weather-card__condition">{weather.condition}</p>
      </div>

      <div className="weather-card__footer">
        <div className="weather-card__date">
          <Calendar className="weather-card__date-icon" />
          <span className="weather-card__date-text">{formatDate(weather.date)}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard
