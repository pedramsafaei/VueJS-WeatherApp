import { config } from '@vue/test-utils';
import PrimeVue from 'primevue/config';

// Mock PrimeVue
config.global.plugins = [PrimeVue];

// Mock environment variables
process.env.VITE_WEATHER_API_KEY = 'test-api-key';
process.env.VITE_WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
process.env.VITE_CACHE_DURATION = '300000';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
