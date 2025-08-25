
import type { WeatherData } from "../api/types";



const API_BASE_URL = 'http://localhost:3001/weather';

class WeatherApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'WeatherApiError';
    this.status = status;
  }
}

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'An error occurred';
    
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    
    throw new WeatherApiError(errorMessage, response.status);
  }
  
  return response.json();
};

export class WeatherApi {
  static async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await fetch(`${API_BASE_URL}?city=${encodeURIComponent(city)}`);
    return handleApiResponse<WeatherData>(response);
  }

  static async getAllWeather(): Promise<WeatherData[]> {
    const response = await fetch(`${API_BASE_URL}/all`);
    return handleApiResponse<WeatherData[]>(response);
  }

  static async searchWeatherInDB(city: string): Promise<WeatherData[]> {
    const response = await fetch(`${API_BASE_URL}/search?city=${encodeURIComponent(city)}`);
    return handleApiResponse<WeatherData[]>(response);
  }
}

export { WeatherApiError };