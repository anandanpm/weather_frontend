export interface WeatherData {
  _id?: string;
  city: string;
  temperature: number;
  condition: string;
  date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface WeatherApiError {
  message: string;
  status?: number;
}