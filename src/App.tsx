import type React from "react"
import WeatherDashboard from "./pages/WeatherDashboard/WeatherDashboard"
import "./App.scss"

const App: React.FC = () => {
  return (
    <div className="app">
      <WeatherDashboard />
    </div>
  )
}

export default App
