import axios, { type AxiosResponse } from "axios"
import type { WeatherData } from "./types"

const API_BASE_URL = "http://localhost:5000/weather"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

class WeatherApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "WeatherApiError"
    this.status = status
  }
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred"
    const status = error.response?.status
    throw new WeatherApiError(message, status)
  },
)

export class WeatherApi {
  static async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await apiClient.get("/", {
      params: { city },
    })
    console.log(response.data,'the data is comming from the api')
    return response.data
  }

  static async getAllWeather(): Promise<WeatherData[]> {
    const response = await apiClient.get("/all")
    return response.data
  }

  static async searchWeatherInDB(city: string): Promise<WeatherData[]> {
    const response = await apiClient.get("/search", {
      params: { city },
    })
    console.log(response.data,'the data is comming from the db')
    return response.data
  }
}

export { WeatherApiError }
