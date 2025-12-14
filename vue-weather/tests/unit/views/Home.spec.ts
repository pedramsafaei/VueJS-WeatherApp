import { describe, it, expect, beforeEach, vi } from '@jest/globals';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '@/views/Home.vue';

// Mock the weather service
vi.mock('@/services/weatherService', () => ({
  getCurrentWeatherByCity: vi.fn().mockResolvedValue({
    name: 'London',
    sys: { country: 'GB' },
    coord: { lat: 51.5074, lon: -0.1278 },
    main: { temp: 15, feels_like: 13, humidity: 75, pressure: 1013 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 5.5, deg: 180 },
  }),
  getForecastByCity: vi.fn().mockResolvedValue({
    list: [],
    city: { name: 'London', country: 'GB' },
  }),
  getCurrentWeatherByCoords: vi.fn(),
  getForecastByCoords: vi.fn(),
}));

vi.mock('@/services/geolocationService', () => ({
  getCurrentPosition: vi.fn().mockResolvedValue({
    lat: 51.5074,
    lon: -0.1278,
  }),
}));

describe('Home.vue', () => {
  let pinia: any;
  let router: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: Home }],
    });
  });

  it('renders home view', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia, router],
        stubs: {
          SearchBar: true,
          FavoriteLocations: true,
          ErrorMessage: true,
          SkeletonLoader: true,
          CurrentWeather: true,
          WeatherForecast: true,
        },
      },
    });

    expect(wrapper.find('.home-view').exists()).toBe(true);
  });

  it('shows welcome message when no weather data', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia, router],
        stubs: {
          SearchBar: true,
          FavoriteLocations: true,
          ErrorMessage: true,
          SkeletonLoader: true,
          CurrentWeather: true,
          WeatherForecast: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Welcome to Weather Pro');
  });

  it('shows skeleton loader when loading', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia, router],
        stubs: {
          SearchBar: true,
          FavoriteLocations: true,
          ErrorMessage: true,
          SkeletonLoader: true,
          CurrentWeather: true,
          WeatherForecast: true,
        },
      },
    });

    const weatherStore = (await import('@/stores/weather')).useWeatherStore();
    weatherStore.setLoading(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'SkeletonLoader' }).exists()).toBe(true);
  });
});
