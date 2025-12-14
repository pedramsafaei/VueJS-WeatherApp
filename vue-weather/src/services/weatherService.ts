/**
 * Weather Service
 * Handles all API interactions with OpenWeatherMap API
 */

import axios, { AxiosError } from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || process.env.VUE_APP_WEATHER_API_BASE_URL;
const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION || process.env.VUE_APP_CACHE_DURATION || '300000');

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

// Simple in-memory cache
const cache = {
  data: new Map<string, CacheEntry<any>>(),
  set<T>(key: string, value: T): void {
    this.data.set(key, {
      value,
      timestamp: Date.now(),
    });
  },
  get<T>(key: string): T | null {
    const cached = this.data.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.data.delete(key);
      return null;
    }
    return cached.value as T;
  },
  clear(): void {
    this.data.clear();
  },
};

/**
 * Sanitize user input to prevent injection
 */
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Build URL with parameters
 */
const buildUrl = (endpoint: string, params: Record<string, any> = {}): string => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('appid', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
};

/**
 * Handle API errors with user-friendly messages
 */
const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      switch (status) {
        case 404:
          return new Error('Location not found. Please check the city name and try again.');
        case 401:
          return new Error('Invalid API key. Please check your configuration.');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
        case 502:
        case 503:
          return new Error('Weather service is temporarily unavailable. Please try again later.');
        default:
          return new Error(data?.message || 'Unable to fetch weather data. Please try again.');
      }
    } else if (axiosError.request) {
      return new Error('Network error. Please check your internet connection.');
    }
  }
  return new Error('An unexpected error occurred. Please try again.');
};

export interface WeatherData {
  name: string;
  sys?: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility?: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

/**
 * Fetch current weather by city name
 */
export const getCurrentWeatherByCity = async (
  city: string,
  units: string = 'metric'
): Promise<WeatherData> => {
  try {
    const sanitizedCity = sanitizeInput(city);
    if (!sanitizedCity) {
      throw new Error('Please enter a valid city name.');
    }

    const cacheKey = `weather_${sanitizedCity}_${units}`;
    const cached = cache.get<WeatherData>(cacheKey);
    if (cached) return cached;

    const url = buildUrl('weather', { q: sanitizedCity, units });
    const response = await axios.get<WeatherData>(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch current weather by coordinates
 */
export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number,
  units: string = 'metric'
): Promise<WeatherData> => {
  try {
    const cacheKey = `weather_${lat}_${lon}_${units}`;
    const cached = cache.get<WeatherData>(cacheKey);
    if (cached) return cached;

    const url = buildUrl('weather', { lat, lon, units });
    const response = await axios.get<WeatherData>(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch 5-day weather forecast by city
 */
export const getForecastByCity = async (
  city: string,
  units: string = 'metric'
): Promise<ForecastData> => {
  try {
    const sanitizedCity = sanitizeInput(city);
    if (!sanitizedCity) {
      throw new Error('Please enter a valid city name.');
    }

    const cacheKey = `forecast_${sanitizedCity}_${units}`;
    const cached = cache.get<ForecastData>(cacheKey);
    if (cached) return cached;

    const url = buildUrl('forecast', { q: sanitizedCity, units });
    const response = await axios.get<ForecastData>(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch 5-day weather forecast by coordinates
 */
export const getForecastByCoords = async (
  lat: number,
  lon: number,
  units: string = 'metric'
): Promise<ForecastData> => {
  try {
    const cacheKey = `forecast_${lat}_${lon}_${units}`;
    const cached = cache.get<ForecastData>(cacheKey);
    if (cached) return cached;

    const url = buildUrl('forecast', { lat, lon, units });
    const response = await axios.get<ForecastData>(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search cities for autocomplete
 */
export const searchCities = async (query: string): Promise<any[]> => {
  try {
    const sanitizedQuery = sanitizeInput(query);
    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      return [];
    }

    const url = buildUrl('weather', { q: sanitizedQuery });
    const response = await axios.get<WeatherData>(url);

    return [
      {
        name: response.data.name,
        country: response.data.sys?.country,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      },
    ];
  } catch (error) {
    return [];
  }
};

/**
 * Clear the cache
 */
export const clearCache = (): void => {
  cache.clear();
};

/**
 * Get air pollution data
 */
export const getAirPollution = async (lat: number, lon: number): Promise<any | null> => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
  searchCities,
  clearCache,
  getAirPollution,
};
