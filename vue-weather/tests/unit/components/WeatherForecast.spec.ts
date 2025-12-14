import { describe, it, expect, beforeEach } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import WeatherForecast from '@/components/WeatherForecast.vue';

describe('WeatherForecast.vue', () => {
  let pinia: any;

  const mockForecastData = {
    list: [
      {
        dt: 1609459200,
        main: {
          temp: 15,
          temp_min: 12,
          temp_max: 18,
          humidity: 75,
        },
        weather: [
          {
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        wind: {
          speed: 5.5,
        },
        dt_txt: '2021-01-01 12:00:00',
      },
      {
        dt: 1609545600,
        main: {
          temp: 16,
          temp_min: 13,
          temp_max: 19,
          humidity: 70,
        },
        weather: [
          {
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        wind: {
          speed: 6.0,
        },
        dt_txt: '2021-01-02 12:00:00',
      },
    ],
    city: {
      name: 'London',
      country: 'GB',
    },
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders forecast data correctly', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        forecast: mockForecastData,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.weather-forecast').exists()).toBe(true);
  });

  it('displays forecast title', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        forecast: mockForecastData,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('5-Day Forecast');
  });

  it('renders forecast items', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        forecast: mockForecastData,
      },
      global: {
        plugins: [pinia],
      },
    });

    const forecastCards = wrapper.findAll('.forecast-card');
    expect(forecastCards.length).toBeGreaterThan(0);
  });
});
