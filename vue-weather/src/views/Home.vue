<template>
  <div class="home-view">
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

    <!-- Loading State with Skeleton -->
    <template v-else-if="loading">
      <SkeletonLoader />
    </template>

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import SearchBar from '@/components/SearchBar.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import WeatherForecast from '@/components/WeatherForecast.vue';
import FavoriteLocations from '@/components/FavoriteLocations.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from '@/services/weatherService';
import { getCurrentPosition } from '@/services/geolocationService';
import { useWeatherStore } from '@/stores/weather';
import { useSettingsStore } from '@/stores/settings';

const weatherStore = useWeatherStore();
const settingsStore = useSettingsStore();
const toast = useToast();

const { currentWeather, forecast, isLoading, error, hasWeatherData } = storeToRefs(weatherStore);
const { units, enableGeolocation } = storeToRefs(settingsStore);

const lastSearchQuery = ref<{ type: string; value: any } | null>(null);

const loading = computed(() => isLoading.value);

const handleSearch = async (city: string) => {
  lastSearchQuery.value = { type: 'city', value: city };
  weatherStore.clearError();
  weatherStore.setLoading(true);

  try {
    const [weatherData, forecastData] = await Promise.all([
      getCurrentWeatherByCity(city, units.value),
      getForecastByCity(city, units.value),
    ]);

    weatherStore.setCurrentWeather(weatherData);
    weatherStore.setForecast(forecastData);
    
    toast.add({
      severity: 'success',
      summary: 'Weather Updated',
      detail: `Showing weather for ${weatherData.name}`,
      life: 3000,
    });
  } catch (err: any) {
    weatherStore.setError(err.message);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.message,
      life: 5000,
    });
  } finally {
    weatherStore.setLoading(false);
  }
};

const handleUseLocation = async () => {
  weatherStore.clearError();
  weatherStore.setLoading(true);

  try {
    const position = await getCurrentPosition();
    lastSearchQuery.value = {
      type: 'coords',
      value: { lat: position.lat, lon: position.lon },
    };

    const [weatherData, forecastData] = await Promise.all([
      getCurrentWeatherByCoords(position.lat, position.lon, units.value),
      getForecastByCoords(position.lat, position.lon, units.value),
    ]);

    weatherStore.setCurrentWeather(weatherData);
    weatherStore.setForecast(forecastData);
    
    toast.add({
      severity: 'success',
      summary: 'Location Found',
      detail: `Showing weather for your location`,
      life: 3000,
    });
  } catch (err: any) {
    weatherStore.setError(err.message);
    toast.add({
      severity: 'error',
      summary: 'Location Error',
      detail: err.message,
      life: 5000,
    });
  } finally {
    weatherStore.setLoading(false);
  }
};

const handleFavoriteSelect = async (location: any) => {
  await handleSearch(location.name);
};

const retryLastSearch = async () => {
  if (!lastSearchQuery.value) {
    return;
  }

  if (lastSearchQuery.value.type === 'city') {
    await handleSearch(lastSearchQuery.value.value);
  } else if (lastSearchQuery.value.type === 'coords') {
    const { lat, lon } = lastSearchQuery.value.value;
    weatherStore.clearError();
    weatherStore.setLoading(true);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeatherByCoords(lat, lon, units.value),
        getForecastByCoords(lat, lon, units.value),
      ]);

      weatherStore.setCurrentWeather(weatherData);
      weatherStore.setForecast(forecastData);
    } catch (err: any) {
      weatherStore.setError(err.message);
    } finally {
      weatherStore.setLoading(false);
    }
  }
};

const handleAutoRefresh = () => {
  if (lastSearchQuery.value && !loading.value) {
    retryLastSearch();
  }
};

// Initialize weather on mount
onMounted(async () => {
  const defaultCity = import.meta.env.VITE_DEFAULT_CITY || process.env.VUE_APP_DEFAULT_CITY;
  if (defaultCity) {
    await handleSearch(defaultCity);
  }
  
  // Listen for auto-refresh events
  window.addEventListener('auto-refresh', handleAutoRefresh);
});

onUnmounted(() => {
  window.removeEventListener('auto-refresh', handleAutoRefresh);
});
</script>

<style scoped>
.home-view {
  width: 100%;
}

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
</style>
