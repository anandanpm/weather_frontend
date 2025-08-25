export interface WeatherData {
  _id?: string
  city: string
  temperature: number
  condition: string
  date: string
}

export interface ApiError {
  message: string
  error?: string
}
