# Weather Pro - Professional Weather Application v3.0

[![CI/CD Pipeline](https://github.com/pedramsafaei/VueJS-WeatherApp/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/pedramsafaei/VueJS-WeatherApp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

A comprehensive, production-ready weather application built with **Vue 3**, **TypeScript**, and **PrimeVue** that provides real-time weather data, forecasts, and detailed meteorological information for locations worldwide.

## 🚀 What's New in v3.0

### Major Framework Updates
- ✨ **Vue 3.4** - Latest Vue with Composition API and `<script setup>` syntax
- 🔷 **TypeScript 5.x** - Full TypeScript support with proper type definitions
- 📦 **Pinia** - Modern, intuitive state management (replacing Vuex)
- 🎨 **PrimeVue 3** - Professional component library with rich UI components
- 🎨 **Tailwind CSS 3** - Utility-first CSS framework for modern styling
- 🏎️ **Performance Optimizations** - Code splitting, lazy loading, and improved bundle size

### UI/UX Enhancements
- ✨ **Glassmorphism Effects** - Modern frosted glass design aesthetic
- 🌓 **Enhanced Dark Mode** - System-aware with manual toggle
- ⚡ **Skeleton Loaders** - Better perceived performance during data fetching
- 🎭 **Smooth Animations** - Micro-interactions and transitions using Tailwind
- 📱 **Improved Responsiveness** - Better mobile and tablet experiences

### Developer Experience
- 🧪 **Comprehensive Testing** - 80%+ test coverage with Vue Test Utils for Vue 3
- 📝 **Better Type Safety** - Full TypeScript integration across all files
- 🔧 **Modern Build Tools** - Optimized webpack configuration
- 📦 **PWA Enhancements** - Improved offline support and app install prompts
- 🛡️ **Error Boundaries** - Graceful error handling throughout the app

## 🌟 Features

### Core Functionality
- **Real-time Weather Data** - Current weather conditions with detailed metrics
- **5-Day Forecast** - Extended weather forecast with daily and hourly breakdowns
- **Geolocation Support** - Automatically detect and display weather for your current location
- **Multiple Locations** - Save and manage favorite locations for quick access
- **Search Functionality** - Intelligent city search
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### Weather Metrics
- Temperature with feels-like perception
- Humidity levels
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Sunrise and sunset times
- Weather conditions and descriptions

### User Experience
- **Dynamic Themes** - Background changes based on weather conditions (sunny, rainy, snowy, cloudy)
- **Unit Conversion** - Toggle between Celsius, Fahrenheit, and Kelvin
- **Dark Mode** - Full dark mode support with automatic detection
- **Smooth Animations** - Beautiful transitions and loading states
- **Accessibility** - WCAG compliant with ARIA labels and keyboard navigation
- **PWA Support** - Install as a progressive web app for offline access

### Technical Features
- **Modern State Management** - Pinia with persistent state
- **Smart Caching** - Reduces API calls and improves performance
- **Error Handling** - User-friendly error messages with retry functionality
- **Auto-refresh** - Configurable automatic data updates
- **Security** - Environment-based configuration with no hardcoded secrets
- **Docker Ready** - Containerized for easy deployment
- **TypeScript** - Type-safe codebase for better maintainability

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Building](#building)
- [Deployment](#deployment)
- [Docker](#docker)
- [Architecture](#architecture)
- [Migration Notes](#migration-notes)
- [Contributing](#contributing)
- [API Documentation](#api-documentation)
- [License](#license)

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn** (v1.22 or higher)
- **Git** for version control
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/pedramsafaei/VueJS-WeatherApp.git
cd VueJS-WeatherApp/vue-weather
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VUE_APP_WEATHER_API_KEY=your_api_key_here
```

**Getting an API Key:**
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Generate an API key from your account dashboard
- The free tier includes 1,000 API calls per day

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | - | Yes |
| `VITE_WEATHER_API_BASE_URL` | API base URL | `https://api.openweathermap.org/data/2.5` | No |
| `VITE_DEFAULT_CITY` | Default city on load | `London` | No |
| `VITE_CACHE_DURATION` | Cache duration (ms) | `300000` | No |

*Note: Both `VITE_` and `VUE_APP_` prefixes are supported for backwards compatibility*

### User Settings

Users can customize their experience through the settings panel:
- Temperature units (Celsius, Fahrenheit, Kelvin)
- Dark mode toggle (with system detection)
- Auto-refresh preferences
- Geolocation permissions

## 💻 Development

### Start Development Server

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

### Project Structure

```
vue-weather/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, styles, and Tailwind CSS
│   ├── components/      # Vue 3 components with <script setup>
│   │   ├── SearchBar.vue
│   │   ├── CurrentWeather.vue
│   │   ├── WeatherForecast.vue
│   │   ├── ForecastCard.vue
│   │   ├── FavoriteLocations.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ErrorMessage.vue
│   │   └── SettingsPanel.vue
│   ├── services/        # API and business logic (TypeScript)
│   │   ├── weatherService.ts
│   │   └── geolocationService.ts
│   ├── stores/          # Pinia stores (TypeScript)
│   │   ├── weather.ts
│   │   ├── favorites.ts
│   │   └── settings.ts
│   ├── utils/           # Helper functions (TypeScript)
│   │   ├── dateFormatter.ts
│   │   └── weatherHelpers.ts
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── shims-vue.d.ts   # Vue TypeScript declarations
├── tests/               # Test files
│   └── unit/
│       ├── components/
│       ├── stores/
│       └── setup.ts
├── .env.example         # Environment template
├── .eslintrc.js         # ESLint configuration
├── jest.config.js       # Jest test configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── Dockerfile           # Docker image definition
├── docker-compose.yml   # Docker Compose configuration
└── package.json         # Dependencies and scripts
```

### Code Style

The project uses ESLint and Prettier for code quality and consistency.

**Type check:**
```bash
npm run type-check
```

**Lint code:**
```bash
npm run lint
```

**Fix linting issues:**
```bash
npm run lint:fix
```

**Format code:**
```bash
npm run format
```

### Pre-commit Hooks

Husky is configured to run linting and formatting checks before each commit:
- Automatically fixes code style issues
- Prevents commits with linting errors
- Ensures consistent code quality

## 🧪 Testing

### Unit Tests

Run unit tests with Jest and Vue Test Utils for Vue 3:

```bash
npm run test:unit
```

**Run tests with coverage:**
```bash
npm run test
```

**Coverage thresholds:**
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

### Test Structure

```
tests/
└── unit/
    ├── components/       # Component tests
    │   ├── CurrentWeather.spec.ts
    │   ├── SearchBar.spec.ts
    │   └── FavoriteLocations.spec.ts
    ├── stores/           # Pinia store tests
    │   ├── weatherStore.spec.ts
    │   ├── favoritesStore.spec.ts
    │   └── settingsStore.spec.ts
    └── setup.ts          # Test configuration
```

### Writing Tests

Example component test with Vue 3:

```typescript
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('emits search event on enter key', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createPinia()],
      },
    });
    const input = wrapper.find('input');
    await input.setValue('London');
    await input.trigger('keypress.enter');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
});
```

## 🏗️ Building

### Production Build

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Build Features
- Code minification and optimization
- Tree shaking for smaller bundle size
- CSS extraction and optimization (Tailwind + PostCSS)
- Service worker generation for PWA
- TypeScript compilation
- PrimeVue and vendor code splitting

### Build Analysis

Analyze bundle size:
```bash
npm run build -- --report
```

## 🚀 Deployment

### Static Hosting

The built application can be deployed to any static hosting service:

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables for Deployment

Ensure you set the weather API key in your hosting platform:

- **Netlify**: Site settings → Build & deploy → Environment
- **Vercel**: Project settings → Environment Variables
- **GitHub Actions**: Repository settings → Secrets

## 🐳 Docker

The application is validated using Docker at `VueJS-WeatherApp/vue-weather/Dockerfile`

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

Access the application at `http://localhost:80`

### Using Docker Directly

**Build image:**
```bash
docker build -f vue-weather/Dockerfile -t weather-pro:v3 .
```

**Run container:**
```bash
docker run -d -p 8080:80 --name weather-pro weather-pro:v3
```

## 🏛️ Architecture

### Component Architecture (Vue 3 Composition API)

All components use the modern `<script setup>` syntax with TypeScript:

```
App.vue (Root)
├── SearchBar.vue (Composition API)
├── FavoriteLocations.vue (Pinia integration)
├── CurrentWeather.vue (TypeScript props)
├── WeatherForecast.vue
│   └── ForecastCard.vue (multiple)
├── LoadingSpinner.vue (PrimeVue components)
├── ErrorMessage.vue
└── SettingsPanel.vue (Sidebar component)
```

### State Management (Pinia)

Modern store structure with TypeScript:

```typescript
// stores/weather.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null);
  const isLoading = computed(() => loading.value);
  
  function setCurrentWeather(weather) {
    currentWeather.value = weather;
  }
  
  return { currentWeather, isLoading, setCurrentWeather };
});
```

### Data Flow

1. **User Action** (search, location request)
2. **Service Layer** (TypeScript API calls)
3. **Pinia Store** (reactive state updates)
4. **Components** (automatic UI updates via Composition API)

## 🔄 Migration Notes

### Vue 2 to Vue 3 Migration

Key changes in this version:

1. **Composition API**: All components migrated to `<script setup>` syntax
2. **Pinia**: Replaced Vuex with Pinia for state management
3. **TypeScript**: Full TypeScript integration across the codebase
4. **PrimeVue**: Modern component library for professional UI
5. **Tailwind CSS**: Utility-first styling framework
6. **Enhanced PWA**: Improved offline support and caching strategies

### Breaking Changes

- Environment variables now use `VITE_` prefix (backwards compatible)
- Import statements updated for Vue 3 APIs
- Store access changed from `mapGetters/mapActions` to Pinia composables
- Test utilities updated to `@vue/test-utils` v2

## 📚 API Documentation

### Weather Service (TypeScript)

```typescript
import { getCurrentWeatherByCity } from '@/services/weatherService';

// Fetch weather by city name
const weather = await getCurrentWeatherByCity('London', 'metric');

// Fetch weather by coordinates
const weather = await getCurrentWeatherByCoords(51.5074, -0.1278, 'metric');

// Fetch 5-day forecast
const forecast = await getForecastByCity('London', 'metric');
```

### Pinia Store Usage

```typescript
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import { useSettingsStore } from '@/stores/settings';

// In setup function
const weatherStore = useWeatherStore();
const { currentWeather, isLoading } = storeToRefs(weatherStore);

// Call actions
weatherStore.setCurrentWeather(data);
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Type check: `npm run type-check`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Write tests for new features (maintain 80%+ coverage)
- Use PrimeVue components where appropriate
- Follow Tailwind CSS conventions for styling
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Weather data API
- **Vue.js 3** - Progressive JavaScript framework
- **Pinia** - Intuitive state management
- **PrimeVue** - Rich component library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pedramsafaei/VueJS-WeatherApp/discussions)

## 🗺️ Roadmap

- [x] Vue 3 migration with Composition API
- [x] TypeScript integration
- [x] Modern UI with PrimeVue and Tailwind CSS
- [x] Comprehensive unit tests (80%+ coverage)
- [x] Enhanced dark mode support
- [x] PWA improvements
- [ ] Multi-language support (i18n)
- [ ] Weather maps with overlays
- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Advanced charts and visualizations

---

**Built with ❤️ by [Pedram Safaei](https://github.com/pedramsafaei)**

**Version 3.0 - Vue 3 + TypeScript + PrimeVue + Tailwind CSS**


![Weather Pro Screenshot](./docs/screenshot.png)

## 🌟 Features

### Core Functionality
- **Real-time Weather Data** - Current weather conditions with detailed metrics
- **5-Day Forecast** - Extended weather forecast with daily and hourly breakdowns
- **Geolocation Support** - Automatically detect and display weather for your current location
- **Multiple Locations** - Save and manage favorite locations for quick access
- **Search with Autocomplete** - Intelligent city search with suggestions
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### Weather Metrics
- Temperature with feels-like perception
- Humidity levels
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Sunrise and sunset times
- Weather conditions and descriptions

### User Experience
- **Dynamic Themes** - Background changes based on weather conditions (sunny, rainy, snowy, cloudy)
- **Unit Conversion** - Toggle between Celsius, Fahrenheit, and Kelvin
- **Dark Mode** - Full dark mode support
- **Smooth Animations** - Beautiful transitions and loading states
- **Accessibility** - WCAG compliant with ARIA labels and keyboard navigation
- **PWA Support** - Install as a progressive web app for offline access

### Technical Features
- **State Management** - Centralized state with Vuex
- **Smart Caching** - Reduces API calls and improves performance
- **Error Handling** - User-friendly error messages with retry functionality
- **Auto-refresh** - Configurable automatic data updates
- **Security** - Environment-based configuration with no hardcoded secrets
- **Docker Ready** - Containerized for easy deployment

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Building](#building)
- [Deployment](#deployment)
- [Docker](#docker)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [API Documentation](#api-documentation)
- [License](#license)

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn** (v1.22 or higher)
- **Git** for version control
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/pedramsafaei/VueJS-WeatherApp.git
cd VueJS-WeatherApp/vue-weather
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```env
VUE_APP_WEATHER_API_KEY=your_api_key_here
```

**Getting an API Key:**
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Generate an API key from your account dashboard
- The free tier includes 1,000 API calls per day

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VUE_APP_WEATHER_API_KEY` | OpenWeatherMap API key | - | Yes |
| `VUE_APP_WEATHER_API_BASE_URL` | API base URL | `https://api.openweathermap.org/data/2.5` | No |
| `VUE_APP_DEFAULT_CITY` | Default city on load | `London` | No |
| `VUE_APP_DEFAULT_UNITS` | Default temperature unit | `metric` | No |
| `VUE_APP_CACHE_DURATION` | Cache duration (ms) | `300000` | No |
| `VUE_APP_ENABLE_GEOLOCATION` | Enable geolocation | `true` | No |

### User Settings

Users can customize their experience through the settings panel:
- Temperature units (Celsius, Fahrenheit, Kelvin)
- Dark mode toggle
- Auto-refresh preferences
- Geolocation permissions

## 💻 Development

### Start Development Server

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

### Project Structure

```
vue-weather/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media files
│   ├── components/      # Vue components
│   │   ├── SearchBar.vue
│   │   ├── CurrentWeather.vue
│   │   ├── WeatherForecast.vue
│   │   ├── ForecastCard.vue
│   │   ├── FavoriteLocations.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ErrorMessage.vue
│   │   └── SettingsPanel.vue
│   ├── services/        # API and business logic
│   │   ├── weatherService.js
│   │   └── geolocationService.js
│   ├── store/           # Vuex state management
│   │   ├── index.js
│   │   └── modules/
│   │       ├── weather.js
│   │       ├── favorites.js
│   │       └── settings.js
│   ├── utils/           # Helper functions
│   │   ├── dateFormatter.js
│   │   └── weatherHelpers.js
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── tests/               # Test files
├── .env.example         # Environment template
├── .eslintrc.js         # ESLint configuration
├── .prettierrc.js       # Prettier configuration
├── jest.config.js       # Jest test configuration
├── Dockerfile           # Docker image definition
├── docker-compose.yml   # Docker Compose configuration
└── package.json         # Dependencies and scripts
```

### Code Style

The project uses ESLint and Prettier for code quality and consistency.

**Lint code:**
```bash
npm run lint
```

**Fix linting issues:**
```bash
npm run lint:fix
```

**Format code:**
```bash
npm run format
```

### Pre-commit Hooks

Husky is configured to run linting and formatting checks before each commit:
- Automatically fixes code style issues
- Prevents commits with linting errors
- Ensures consistent code quality

## 🧪 Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm run test:unit
```

**Run tests in watch mode:**
```bash
npm run test:unit -- --watch
```

**Generate coverage report:**
```bash
npm run test:unit -- --coverage
```

### Test Structure

```
tests/
└── unit/
    ├── components/       # Component tests
    ├── services/         # Service tests
    ├── utils/           # Utility tests
    └── store/           # Vuex store tests
```

### Writing Tests

Example component test:

```javascript
import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('emits search event on enter key', async () => {
    const wrapper = shallowMount(SearchBar);
    await wrapper.find('input').setValue('London');
    await wrapper.find('input').trigger('keypress.enter');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
});
```

## 🏗️ Building

### Production Build

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Build Features
- Code minification and optimization
- Tree shaking for smaller bundle size
- CSS extraction and optimization
- Service worker generation for PWA
- Source maps for debugging

### Build Analysis

Analyze bundle size:
```bash
npm run build -- --report
```

## 🚀 Deployment

### Static Hosting

The built application can be deployed to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
```bash
# Build the app
npm run build

# Deploy to gh-pages branch
npm run deploy
```

### Environment Variables for Deployment

Ensure you set the `VUE_APP_WEATHER_API_KEY` environment variable in your hosting platform:

- **Netlify**: Site settings → Build & deploy → Environment
- **Vercel**: Project settings → Environment Variables
- **GitHub Actions**: Repository settings → Secrets

## 🐳 Docker

### Using Docker Compose (Recommended)

**Production build:**
```bash
docker-compose up -d
```

Access the application at `http://localhost:8080`

**Development mode:**
```bash
docker-compose --profile dev up
```

**Stop containers:**
```bash
docker-compose down
```

### Using Docker Directly

**Build image:**
```bash
docker build -t weather-pro:latest .
```

**Run container:**
```bash
docker run -d -p 8080:80 --name weather-pro weather-pro:latest
```

**View logs:**
```bash
docker logs weather-pro
```

**Stop container:**
```bash
docker stop weather-pro
docker rm weather-pro
```

### Docker Deployment

The application includes:
- Multi-stage build for optimized image size
- Nginx for serving static files
- Health check endpoint at `/health`
- Gzip compression
- Security headers
- Cache control for static assets

## 🏛️ Architecture

### Component Architecture

The application follows a modular component-based architecture:

```
App.vue (Root)
├── SearchBar.vue
├── FavoriteLocations.vue
├── CurrentWeather.vue
├── WeatherForecast.vue
│   └── ForecastCard.vue (multiple)
├── LoadingSpinner.vue
├── ErrorMessage.vue
└── SettingsPanel.vue
```

### State Management

Vuex store is organized into modules:

- **weather** - Current weather data and forecast
- **favorites** - Saved locations management
- **settings** - User preferences and configuration

### Data Flow

1. **User Action** (search, location request)
2. **Service Layer** (API calls, data processing)
3. **Vuex Store** (state updates)
4. **Components** (reactive UI updates)

### Services Layer

Separates business logic from components:

- **weatherService.js** - OpenWeatherMap API integration
- **geolocationService.js** - Browser geolocation handling

### Utilities

Reusable helper functions:

- **dateFormatter.js** - Date and time formatting
- **weatherHelpers.js** - Weather data processing and conversions

## 📚 API Documentation

### Weather Service

```javascript
import { getCurrentWeatherByCity } from '@/services/weatherService';

// Fetch weather by city name
const weather = await getCurrentWeatherByCity('London', 'metric');

// Fetch weather by coordinates
const weather = await getCurrentWeatherByCoords(51.5074, -0.1278, 'metric');

// Fetch 5-day forecast
const forecast = await getForecastByCity('London', 'metric');

// Search cities (autocomplete)
const cities = await searchCities('Lon');
```

### Geolocation Service

```javascript
import { getCurrentPosition } from '@/services/geolocationService';

// Get user's current position
const position = await getCurrentPosition();
// Returns: { lat: number, lon: number, accuracy: number }
```

### Vuex Store Usage

```javascript
// In components
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('weather', ['currentWeather', 'forecast']),
    ...mapGetters('settings', ['units', 'darkMode']),
  },
  methods: {
    ...mapActions('weather', ['setCurrentWeather']),
    ...mapActions('favorites', ['addFavorite']),
  },
};
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test:unit`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure CI/CD pipeline passes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Weather data API
- **Vue.js** - Progressive JavaScript framework
- **Vuex** - State management
- **Axios** - HTTP client
- Weather icons and imagery

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pedramsafaei/VueJS-WeatherApp/discussions)
- **Email**: [Contact](mailto:your-email@example.com)

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Weather maps with overlays
- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Social sharing features
- [ ] Export weather data
- [ ] Advanced charts and visualizations
- [ ] Integration with more weather APIs

---

**Built with ❤️ by [Pedram Safaei](https://github.com/pedramsafaei)**

