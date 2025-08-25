"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../../components/common/Header/Header"
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner"
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage"
import WeatherSearch from "../../components/weather/WeatherSearch/WeatherSearch"
import WeatherTabs, { type TabType } from "../../components/weather/WeatherTabs/WeatherTabs"
import WeatherHistory from "../../components/weather/WeatherHistory/WeatherHistory"
import WeatherCard from "../../components/weather/WeatherCard/WeatherCard"
import { WeatherApi, WeatherApiError } from "../../services/api/weatherApi"
import type { WeatherData } from "../../services/api/types"
import "./WeatherDashboard.scss"

const WeatherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("search")
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([])
  const [searchResults, setSearchResults] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load weather history on component mount
  useEffect(() => {
    loadWeatherHistory()
  }, [])

  const loadWeatherHistory = async () => {
    try {
      setHistoryLoading(true)
      const history = await WeatherApi.getAllWeather()
      setWeatherHistory(history)
    } catch (err) {
      console.error("Failed to load weather history:", err)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleLiveSearch = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      setCurrentWeather(null)

      const weather = await WeatherApi.getCurrentWeather(city)
      setCurrentWeather(weather)

      // Refresh history to include new data
      await loadWeatherHistory()
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message)
      } else {
        setError("Failed to fetch weather data. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDatabaseSearch = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      setSearchResults([])

      const results = await WeatherApi.searchWeatherInDB(city)
      setSearchResults(results)
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message)
      } else {
        setError("Failed to search weather database. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (city: string) => {
    if (activeTab === "search") {
      handleLiveSearch(city)
    } else if (activeTab === "database") {
      handleDatabaseSearch(city)
    }
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setError(null)
    setCurrentWeather(null)
    setSearchResults([])
  }

  const clearError = () => setError(null)

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "search":
        return "Enter city name for live weather..."
      case "database":
        return "Search cached weather data..."
      default:
        return "Enter city name..."
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "search":
        return (
          <div className="mt-8">
            {loading && <LoadingSpinner text="Fetching weather data..." />}
            {currentWeather && !loading && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Current Weather</h3>
                <div className="flex justify-center">
                  <WeatherCard weather={currentWeather} />
                </div>
              </motion.div>
            )}
          </div>
        )

      case "database":
        return (
          <div className="mt-8">
            {loading && <LoadingSpinner text="Searching database..." />}
            {searchResults.length > 0 && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Search Results ({searchResults.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((weather, index) => (
                    <motion.div
                      key={weather._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <WeatherCard weather={weather} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )

      case "history":
        return <WeatherHistory weatherHistory={weatherHistory} loading={historyLoading} onClear={loadWeatherHistory} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeatherTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <AnimatePresence mode="wait">
            {error && (
              <div className="mb-6">
                <ErrorMessage message={error} onClose={clearError} />
              </div>
            )}
          </AnimatePresence>

          {(activeTab === "search" || activeTab === "database") && (
            <div className="mb-8">
              <WeatherSearch onSearch={handleSearch} loading={loading} placeholder={getSearchPlaceholder()} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default WeatherDashboard
