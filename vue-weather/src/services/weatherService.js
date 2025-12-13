/**
 * Weather Service
 * Handles all API interactions with OpenWeatherMap API
 */

import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_WEATHER_API_BASE_URL;
const CACHE_DURATION = parseInt(process.env.VUE_APP_CACHE_DURATION) || 300000; // 5 minutes

// Simple in-memory cache
const cache = {
  data: new Map(),
  set(key, value) {
    this.data.set(key, {
      value,
      timestamp: Date.now(),
    });
  },
  get(key) {
    const cached = this.data.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.data.delete(key);
      return null;
    }
    return cached.value;
  },
  clear() {
    this.data.clear();
  },
};

/**
 * Sanitize user input to prevent injection
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
const sanitizeInput = input => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Build URL with parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} - Complete URL
 */
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('appid', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

/**
 * Handle API errors with user-friendly messages
 * @param {Error} error - Error object
 * @returns {Error} - Enhanced error with user message
 */
const handleApiError = error => {
  if (error.response) {
    const { status, data } = error.response;
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
        return new Error(data.message || 'Unable to fetch weather data. Please try again.');
    }
  } else if (error.request) {
    return new Error('Network error. Please check your internet connection.');
  } else {
    return new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * Fetch current weather by city name
 * @param {string} city - City name
 * @param {string} units - Temperature units (metric, imperial, standard)
 * @returns {Promise<Object>} - Weather data
 */
export const getCurrentWeatherByCity = async (city, units = 'metric') => {
  try {
    const sanitizedCity = sanitizeInput(city);
    if (!sanitizedCity) {
      throw new Error('Please enter a valid city name.');
    }

    const cacheKey = `current_${sanitizedCity}_${units}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const url = buildUrl('weather', { q: sanitizedCity, units });
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Temperature units
 * @returns {Promise<Object>} - Weather data
 */
export const getCurrentWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const cacheKey = `current_${lat}_${lon}_${units}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const url = buildUrl('weather', { lat, lon, units });
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch 5-day weather forecast by city name
 * @param {string} city - City name
 * @param {string} units - Temperature units
 * @returns {Promise<Object>} - Forecast data
 */
export const getForecastByCity = async (city, units = 'metric') => {
  try {
    const sanitizedCity = sanitizeInput(city);
    if (!sanitizedCity) {
      throw new Error('Please enter a valid city name.');
    }

    const cacheKey = `forecast_${sanitizedCity}_${units}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const url = buildUrl('forecast', { q: sanitizedCity, units });
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetch 5-day weather forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Temperature units
 * @returns {Promise<Object>} - Forecast data
 */
export const getForecastByCoords = async (lat, lon, units = 'metric') => {
  try {
    const cacheKey = `forecast_${lat}_${lon}_${units}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const url = buildUrl('forecast', { lat, lon, units });
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search cities for autocomplete
 * @param {string} query - Search query
 * @returns {Promise<Array>} - List of matching cities
 */
export const searchCities = async query => {
  try {
    const sanitizedQuery = sanitizeInput(query);
    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      return [];
    }

    // Note: OpenWeatherMap doesn't have a dedicated search endpoint
    // This is a simplified implementation
    // In production, consider using a dedicated geocoding service
    const url = buildUrl('weather', { q: sanitizedQuery });
    const response = await axios.get(url);

    return [
      {
        name: response.data.name,
        country: response.data.sys.country,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      },
    ];
  } catch (error) {
    // Return empty array for search errors to not disrupt UX
    return [];
  }
};

/**
 * Clear the cache
 */
export const clearCache = () => {
  cache.clear();
};

/**
 * Get air pollution data
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Air pollution data
 */
export const getAirPollution = async (lat, lon) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Non-critical feature, return null on error
    console.warn('Air pollution data unavailable:', error.message);
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
