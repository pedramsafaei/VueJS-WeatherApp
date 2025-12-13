# Weather Pro - Professional Weather Application

[![CI/CD Pipeline](https://github.com/pedramsafaei/VueJS-WeatherApp/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/pedramsafaei/VueJS-WeatherApp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, production-ready weather application built with Vue.js that provides real-time weather data, forecasts, and detailed meteorological information for locations worldwide.

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

