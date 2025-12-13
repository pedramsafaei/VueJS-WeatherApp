<template>
  <div id="app" :class="['app-container', themeClass, { 'dark-mode': darkMode }]">
    <main class="main-content">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">🌤️ Weather Pro</h1>
          <button
            class="settings-button"
            aria-label="Open settings"
            @click="toggleSettings"
          >
            ⚙️
          </button>
        </div>
      </header>

      <!-- Search Bar -->
      <SearchBar
        :enable-geolocation="enableGeolocation"
        :enable-autocomplete="true"
        @search="handleSearch"
        @use-location="handleUseLocation"
      />

      <!-- Favorite Locations -->
      <FavoriteLocations @select="handleFavoriteSelect" />

      <!-- Error Message -->
      <ErrorMessage
        v-if="error"
        :message="error"
        @retry="retryLastSearch"
      />

      <!-- Loading State -->
      <LoadingSpinner v-else-if="loading" />

      <!-- Weather Content -->
      <template v-else-if="hasWeatherData">
        <CurrentWeather :weather="currentWeather" />
        <WeatherForecast v-if="forecast" :forecast="forecast" />
      </template>

      <!-- Welcome Message -->
      <div v-else class="welcome-message">
        <h2 class="welcome-title">Welcome to Weather Pro</h2>
        <p class="welcome-text">
          Search for a city to get started, or use your current location.
        </p>
        <div class="welcome-icon">🌍</div>
      </div>

      <!-- Footer -->
      <footer class="app-footer">
        <p>
          Powered by
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </main>

    <!-- Settings Panel -->
    <SettingsPanel
      :is-open="showSettings"
      @close="toggleSettings"
      @toggle-dark-mode="toggleDarkMode"
      @units-changed="handleUnitsChange"
    />

    <!-- Overlay for settings -->
    <div
      v-if="showSettings"
      class="overlay"
      @click="toggleSettings"
    ></div>
  </div>
</template>

<script>
/**
 * Main App Component
 * Root component managing the application state and layout
 */
import { mapGetters, mapActions } from 'vuex';
import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import FavoriteLocations from './components/FavoriteLocations.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import SettingsPanel from './components/SettingsPanel.vue';
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from './services/weatherService';
import { getCurrentPosition } from './services/geolocationService';
import { getWeatherTheme, isDayTime } from './utils/weatherHelpers';

export default {
  name: 'App',
  components: {
    SearchBar,
    CurrentWeather,
    WeatherForecast,
    FavoriteLocations,
    LoadingSpinner,
    ErrorMessage,
    SettingsPanel,
  },
  data() {
    return {
      showSettings: false,
      lastSearchQuery: null,
      autoRefreshInterval: null,
    };
  },
  computed: {
    ...mapGetters('weather', [
      'currentWeather',
      'forecast',
      'isLoading',
      'error',
      'hasWeatherData',
    ]),
    ...mapGetters('settings', [
      'units',
      'darkMode',
      'enableGeolocation',
      'autoRefresh',
      'refreshInterval',
    ]),
    loading() {
      return this.isLoading;
    },
    themeClass() {
      if (!this.currentWeather || !this.currentWeather.weather) {
        return 'default-day';
      }
      const isDay = isDayTime(
        Date.now() / 1000,
        this.currentWeather.sys?.sunrise || 0,
        this.currentWeather.sys?.sunset || 0
      );
      return getWeatherTheme(this.currentWeather.weather[0].main, isDay);
    },
  },
  watch: {
    autoRefresh(enabled) {
      if (enabled) {
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    },
    refreshInterval() {
      if (this.autoRefresh) {
        this.stopAutoRefresh();
        this.startAutoRefresh();
      }
    },
  },
  mounted() {
    // Apply dark mode from settings
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    }

    // Try to load default city or use geolocation
    this.initializeWeather();

    // Start auto-refresh if enabled
    if (this.autoRefresh) {
      this.startAutoRefresh();
    }
  },
  beforeDestroy() {
    this.stopAutoRefresh();
  },
  methods: {
    ...mapActions('weather', [
      'setCurrentWeather',
      'setForecast',
      'setLoading',
      'setError',
      'clearError',
    ]),
    ...mapActions('settings', ['toggleDarkMode']),

    async initializeWeather() {
      const defaultCity = process.env.VUE_APP_DEFAULT_CITY;
      if (defaultCity) {
        await this.handleSearch(defaultCity);
      }
    },

    async handleSearch(city) {
      this.lastSearchQuery = { type: 'city', value: city };
      this.clearError();
      this.setLoading(true);

      try {
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeatherByCity(city, this.units),
          getForecastByCity(city, this.units),
        ]);

        this.setCurrentWeather(weatherData);
        this.setForecast(forecastData);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.setLoading(false);
      }
    },

    async handleUseLocation() {
      this.clearError();
      this.setLoading(true);

      try {
        const position = await getCurrentPosition();
        this.lastSearchQuery = {
          type: 'coords',
          value: { lat: position.lat, lon: position.lon },
        };

        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeatherByCoords(position.lat, position.lon, this.units),
          getForecastByCoords(position.lat, position.lon, this.units),
        ]);

        this.setCurrentWeather(weatherData);
        this.setForecast(forecastData);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.setLoading(false);
      }
    },

    async handleFavoriteSelect(location) {
      await this.handleSearch(location.name);
    },

    async handleUnitsChange() {
      // Refresh weather data with new units
      if (this.lastSearchQuery) {
        await this.retryLastSearch();
      }
    },

    async retryLastSearch() {
      if (!this.lastSearchQuery) {
        return;
      }

      if (this.lastSearchQuery.type === 'city') {
        await this.handleSearch(this.lastSearchQuery.value);
      } else if (this.lastSearchQuery.type === 'coords') {
        const { lat, lon } = this.lastSearchQuery.value;
        this.clearError();
        this.setLoading(true);

        try {
          const [weatherData, forecastData] = await Promise.all([
            getCurrentWeatherByCoords(lat, lon, this.units),
            getForecastByCoords(lat, lon, this.units),
          ]);

          this.setCurrentWeather(weatherData);
          this.setForecast(forecastData);
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.setLoading(false);
        }
      }
    },

    toggleSettings() {
      this.showSettings = !this.showSettings;
    },

    startAutoRefresh() {
      this.autoRefreshInterval = setInterval(() => {
        if (this.lastSearchQuery && !this.loading) {
          this.retryLastSearch();
        }
      }, this.refreshInterval);
    },

    stopAutoRefresh() {
      if (this.autoRefreshInterval) {
        clearInterval(this.autoRefreshInterval);
        this.autoRefreshInterval = null;
      }
    },
  },
};
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  transition: background 0.5s ease;
}

/* Theme Backgrounds */
.sunny-day {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.sunny-night {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.cloudy-day {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
}

.cloudy-night {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.rainy-day {
  background: linear-gradient(135deg, #536976 0%, #292e49 100%);
}

.rainy-night {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.stormy-day,
.stormy-night {
  background: linear-gradient(135deg, #373b44 0%, #4286f4 100%);
}

.snowy-day {
  background: linear-gradient(135deg, #e6dada 0%, #274046 100%);
}

.snowy-night {
  background: linear-gradient(135deg, #e6e9f0 0%, #2c3e50 100%);
}

.foggy-day,
.foggy-night {
  background: linear-gradient(135deg, #757f9a 0%, #d7dde8 100%);
}

.default-day {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-container {
  position: relative;
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.5)
  );
}

/* Header */
.app-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  color: white;
  font-size: 32px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.settings-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Welcome Message */
.welcome-message {
  text-align: center;
  padding: 80px 24px;
  color: white;
}

.welcome-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome-text {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.welcome-icon {
  font-size: 80px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 32px 24px;
  color: white;
  font-size: 14px;
  opacity: 0.8;
}

.app-footer a {
  color: white;
  text-decoration: underline;
}

.app-footer a:hover {
  opacity: 0.8;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dark Mode Adjustments */
.dark-mode .main-content {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.7)
  );
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .app-title {
    font-size: 24px;
  }

  .settings-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .welcome-title {
    font-size: 28px;
  }

  .welcome-text {
    font-size: 16px;
  }

  .welcome-icon {
    font-size: 60px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles for accessibility */
button:focus,
input:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}
</style>
