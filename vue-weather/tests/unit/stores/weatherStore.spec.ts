import { describe, it, expect, beforeEach } from '@jest/globals';
import { setActivePinia, createPinia } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

describe('Weather Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with correct default state', () => {
    const store = useWeatherStore();
    
    expect(store.currentWeather).toBeNull();
    expect(store.forecast).toBeNull();
    expect(store.weatherAlerts).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.lastUpdated).toBeNull();
  });

  it('sets current weather', () => {
    const store = useWeatherStore();
    const mockWeather = {
      name: 'London',
      sys: { country: 'GB', sunrise: 123456, sunset: 789012 },
      coord: { lat: 51.5074, lon: -0.1278 },
      main: { temp: 15, feels_like: 13, humidity: 75, pressure: 1013 },
      weather: [{ main: 'Clouds', description: 'cloudy', icon: '03d' }],
      wind: { speed: 5, deg: 180 },
    };

    store.setCurrentWeather(mockWeather);

    expect(store.currentWeather).toEqual(mockWeather);
    expect(store.lastUpdated).toBeInstanceOf(Date);
    expect(store.error).toBeNull();
    expect(store.hasWeatherData).toBe(true);
  });

  it('sets forecast data', () => {
    const store = useWeatherStore();
    const mockForecast = {
      list: [],
      city: { name: 'London', country: 'GB' },
    };

    store.setForecast(mockForecast);

    expect(store.forecast).toEqual(mockForecast);
  });

  it('handles loading state', () => {
    const store = useWeatherStore();

    store.setLoading(true);
    expect(store.loading).toBe(true);
    expect(store.isLoading).toBe(true);

    store.setLoading(false);
    expect(store.loading).toBe(false);
    expect(store.isLoading).toBe(false);
  });

  it('handles error state', () => {
    const store = useWeatherStore();
    const errorMessage = 'Failed to fetch weather';

    store.setError(errorMessage);

    expect(store.error).toBe(errorMessage);
    expect(store.loading).toBe(false);
  });

  it('clears error', () => {
    const store = useWeatherStore();
    
    store.setError('Some error');
    expect(store.error).toBe('Some error');

    store.clearError();
    expect(store.error).toBeNull();
  });

  it('clears all weather data', () => {
    const store = useWeatherStore();
    
    store.setCurrentWeather({} as any);
    store.setForecast({} as any);
    store.setWeatherAlerts([{ alert: 'test' }]);
    store.setError('error');

    store.clearWeatherData();

    expect(store.currentWeather).toBeNull();
    expect(store.forecast).toBeNull();
    expect(store.weatherAlerts).toEqual([]);
    expect(store.error).toBeNull();
  });
});
