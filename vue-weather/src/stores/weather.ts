import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface WeatherData {
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

interface ForecastData {
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

export const useWeatherStore = defineStore('weather', () => {
  // State
  const currentWeather = ref<WeatherData | null>(null);
  const forecast = ref<ForecastData | null>(null);
  const weatherAlerts = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastUpdated = ref<Date | null>(null);

  // Getters
  const isLoading = computed(() => loading.value);
  const hasWeatherData = computed(() => currentWeather.value !== null);

  // Actions
  function setCurrentWeather(weather: WeatherData) {
    currentWeather.value = weather;
    lastUpdated.value = new Date();
    error.value = null;
  }

  function setForecast(forecastData: ForecastData) {
    forecast.value = forecastData;
  }

  function setWeatherAlerts(alerts: any[]) {
    weatherAlerts.value = alerts;
  }

  function setLoading(isLoading: boolean) {
    loading.value = isLoading;
  }

  function setError(errorMessage: string) {
    error.value = errorMessage;
    loading.value = false;
  }

  function clearError() {
    error.value = null;
  }

  function clearWeatherData() {
    currentWeather.value = null;
    forecast.value = null;
    weatherAlerts.value = [];
    error.value = null;
  }

  return {
    // State
    currentWeather,
    forecast,
    weatherAlerts,
    loading,
    error,
    lastUpdated,
    // Getters
    isLoading,
    hasWeatherData,
    // Actions
    setCurrentWeather,
    setForecast,
    setWeatherAlerts,
    setLoading,
    setError,
    clearError,
    clearWeatherData,
  };
});
