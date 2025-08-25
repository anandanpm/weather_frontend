import type React from "react"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import "./WeatherSearch.scss"

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
      className="weather-search"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="weather-search__input-group">
        <div className="weather-search__input-wrapper">
          <MapPin className="weather-search__input-icon" />
          <input
            type="text"
            className="weather-search__input"
            placeholder={placeholder}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="weather-search__button"
          disabled={loading || !city.trim()}
        >
          <Search className="weather-search__button-icon" />
          <span className="weather-search__button-text">
            {loading ? "Searching..." : "Search"}
          </span>
        </button>
      </div>
    </motion.form>
  )
}

export default WeatherSearch
