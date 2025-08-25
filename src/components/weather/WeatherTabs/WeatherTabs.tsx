
import type React from "react"
import { motion } from "framer-motion"
import { Search, Database, History } from "lucide-react"
import "./WeatherTabs.scss"

export type TabType = "search" | "database" | "history"

interface WeatherTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const WeatherTabs: React.FC<WeatherTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "search" as TabType,
      label: "Live Search",
      icon: Search,
      description: "Search weather with API + cache",
    },
    {
      id: "database" as TabType,
      label: "Database Search",
      icon: Database,
      description: "Search cached data only",
    },
    {
      id: "history" as TabType,
      label: "History",
      icon: History,
      description: "View all weather history",
    },
  ]

  return (
    <div className="weather-tabs">
      <div className="weather-tabs__list">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`weather-tabs__tab ${activeTab === tab.id ? "weather-tabs__tab--active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="weather-tabs__icon" />
              <div className="weather-tabs__content">
                <span className="weather-tabs__label">{tab.label}</span>
                <span className="weather-tabs__description">{tab.description}</span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  className="weather-tabs__indicator"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default WeatherTabs
