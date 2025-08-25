import type React from "react"
import { Cloud } from "lucide-react"
import "./Header.scss"

const Header: React.FC = () => {
  return (
    <header className="weather-header">
      <div className="header-content">
        <div className="logo">
          <Cloud className="logo-icon" />
          <h1 className="logo-text">Weather Dashboard</h1>
        </div>
        <p className="subtitle">Real-time weather data with smart caching</p>
      </div>
    </header>
  )
}

export default Header
