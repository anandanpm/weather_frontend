// import axios, { type AxiosResponse } from "axios"
// import type { WeatherData } from "./types"

// const API_BASE_URL = import.meta.env.VITE_WEATHER_API_URL  

// console.log(API_BASE_URL,'the base url is here')
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// class WeatherApiError extends Error {
//   status?: number

//   constructor(message: string, status?: number) {
//     super(message)
//     this.name = "WeatherApiError"
//     this.status = status
//   }
// }

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error) => {
//     const message = error.response?.data?.message || error.message || "An error occurred"
//     const status = error.response?.status
//     throw new WeatherApiError(message, status)
//   },
// )

// export class WeatherApi {
//   static async getCurrentWeather(city: string): Promise<WeatherData> {
//     const response = await apiClient.get("/", {
//       params: { city },
//     })
//     console.log(response.data,'the data is comming from the api')
//     return response.data
//   }

//   static async getAllWeather(): Promise<WeatherData[]> {
//     const response = await apiClient.get("/all")
//     return response.data
//   }

//   static async searchWeatherInDB(city: string): Promise<WeatherData[]> {
//     const response = await apiClient.get("/search", {
//       params: { city },
//     })
//     console.log(response.data,'the data is comming from the db')
//     return response.data
//   }
// }

// export { WeatherApiError }


import axios, { type AxiosResponse } from "axios"
import type { WeatherData } from "./types"

const API_BASE_URL = import.meta.env.VITE_WEATHER_API_URL  

// Enhanced debugging
console.log('🔍 Debug Info:')
console.log('- API_BASE_URL:', API_BASE_URL)
console.log('- All env vars:', import.meta.env)
console.log('- Mode:', import.meta.env.MODE)

if (!API_BASE_URL) {
  console.error('❌ CRITICAL: VITE_WEATHER_API_URL is not defined!')
  console.log('💡 Make sure your .env file contains: VITE_WEATHER_API_URL=your_backend_url')
}

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

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Outgoing Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers,
      timeout: config.timeout
    })
    return config
  },
  (error) => {
    console.error('📤 Request Setup Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling and debugging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('📥 Response Received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    })
    return response
  },
  (error) => {
    console.error('📥 Response Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method
      }
    })

    // Network error (no response received)
    if (!error.response) {
      console.error('🌐 Network Error - Possible causes:')
      console.error('  • Backend server is not running')
      console.error('  • Wrong API URL')
      console.error('  • CORS issues')
      console.error('  • Firewall blocking the request')
    }

    const message = error.response?.data?.message || error.message || "An error occurred"
    const status = error.response?.status
    throw new WeatherApiError(message, status)
  },
)

export class WeatherApi {
  static async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      console.log(`🌤️ Getting current weather for: "${city}"`)
      
      if (!city || city.trim() === '') {
        throw new WeatherApiError('City parameter is required', 400)
      }

      const response = await apiClient.get("/", {
        params: { city: city.trim() },
      })
      
      console.log('✅ Weather data received:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ getCurrentWeather failed:', error)
      throw error
    }
  }

  static async getAllWeather(): Promise<WeatherData[]> {
    try {
      console.log('📋 Getting all weather data')
      
      const response = await apiClient.get("/all")
      
      console.log('✅ All weather data received:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ getAllWeather failed:', error)
      throw error
    }
  }

  static async searchWeatherInDB(city: string): Promise<WeatherData[]> {
    try {
      console.log(`🔍 Searching weather in DB for: "${city}"`)
      
      if (!city || city.trim() === '') {
        throw new WeatherApiError('City parameter is required', 400)
      }

      const response = await apiClient.get("/search", {
        params: { city: city.trim() },
      })
      
      console.log('✅ DB search results:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ searchWeatherInDB failed:', error)
      throw error
    }
  }

  // Helper method to test connection
  static async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing API connection...')
      
      if (!API_BASE_URL) {
        console.error('❌ No API URL configured')
        return false
      }

      // Try a simple request to test connectivity
      const response = await fetch(API_BASE_URL, { 
        method: 'GET',
        mode: 'cors'
      })
      
      console.log('✅ Connection test result:', {
        status: response.status,
        ok: response.ok,
        url: response.url
      })
      
      return response.ok
    } catch (error) {
      console.error('❌ Connection test failed:', error)
      return false
    }
  }
}

export { WeatherApiError }