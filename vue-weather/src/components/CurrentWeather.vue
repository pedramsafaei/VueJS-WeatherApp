<template>
  <div v-if="weather" class="current-weather glass-panel p-8 mx-auto max-w-4xl animate-slide-up">
    <div class="location-info text-center mb-6">
      <h1 class="location-name text-4xl font-bold text-white mb-2 text-shadow-lg">
        {{ weather.name }}<span v-if="weather.sys">, {{ weather.sys.country }}</span>
      </h1>
      <p class="date text-lg text-white/90">{{ formattedDate }}</p>
      <Button
        v-if="!isFavoriteLocation"
        label="Add to Favorites"
        icon="pi pi-star"
        severity="secondary"
        rounded
        text
        @click="toggleFavorite"
        class="mt-4 text-white hover:bg-white/20"
      />
      <Button
        v-else
        label="Remove from Favorites"
        icon="pi pi-star-fill"
        severity="warning"
        rounded
        text
        @click="toggleFavorite"
        class="mt-4"
      />
    </div>

    <div class="main-weather flex flex-col items-center mb-8">
      <div class="weather-icon">
        <img
          :src="getWeatherIconUrl(weather.weather[0].icon)"
          :alt="weather.weather[0].description"
          class="w-40 h-40 drop-shadow-lg"
        />
      </div>
      <div class="temperature flex items-start my-4 text-shadow-lg">
        <span class="temp-value text-7xl font-black text-white">{{ Math.round(weather.main.temp) }}</span>
        <span class="temp-unit text-4xl mt-2 text-white">{{ temperatureUnit }}</span>
      </div>
      <div class="weather-description text-center">
        <p class="main-description text-3xl font-semibold text-white mb-2 capitalize">
          {{ weather.weather[0].main }}
        </p>
        <p class="sub-description text-lg text-white/90 capitalize">
          {{ weather.weather[0].description }}
        </p>
      </div>
    </div>

    <div class="weather-details grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      <Card class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-thermometer text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Feels Like</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ Math.round(weather.main.feels_like) }}{{ temperatureUnit }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-cloud text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Humidity</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ weather.main.humidity }}%
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-send text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Wind Speed</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ weather.wind.speed }} {{ windSpeedUnit }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-compass text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Wind Direction</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ getWindDirection(weather.wind.deg) }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-arrow-down text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Pressure</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ weather.main.pressure }} hPa
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="weather.visibility" class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-eye text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Visibility</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ formatVisibility(weather.visibility) }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="weather.sys" class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-sun text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Sunrise</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ formatTimestamp(weather.sys.sunrise) }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="weather.sys" class="detail-item glass-panel-dark hover:-translate-y-1 transition-transform cursor-pointer">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-moon text-3xl text-white/80"></i>
            <div class="detail-content">
              <span class="detail-label text-xs text-white/70 uppercase tracking-wide">Sunset</span>
              <span class="detail-value text-lg font-semibold text-white block">
                {{ formatTimestamp(weather.sys.sunset) }}
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-if="lastUpdated" class="last-updated text-center mt-6 text-sm text-white/70 italic">
      Last updated: {{ getRelativeTime(lastUpdated) }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CurrentWeather Component
 * Displays current weather conditions with detailed metrics
 */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Card from 'primevue/card';
import {
  getWindDirection,
  getWindSpeedUnit,
  getTemperatureUnit,
  formatVisibility,
} from '@/utils/weatherHelpers';
import { formatTimestamp, getRelativeTime, formatDate } from '@/utils/dateFormatter';
import { useSettingsStore } from '@/stores/settings';
import { useFavoritesStore } from '@/stores/favorites';
import { useWeatherStore } from '@/stores/weather';

interface Props {
  weather: any;
}

const props = defineProps<Props>();

const settingsStore = useSettingsStore();
const favoritesStore = useFavoritesStore();
const weatherStore = useWeatherStore();

const { units } = storeToRefs(settingsStore);
const { lastUpdated } = storeToRefs(weatherStore);

const temperatureUnit = computed(() => getTemperatureUnit(units.value));
const windSpeedUnit = computed(() => getWindSpeedUnit(units.value));
const formattedDate = computed(() => formatDate(new Date()));
const isFavoriteLocation = computed(() => favoritesStore.isFavorite(props.weather.name));

const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

const toggleFavorite = () => {
  if (isFavoriteLocation.value) {
    favoritesStore.removeFavorite(props.weather.name);
  } else {
    favoritesStore.addFavorite({
      name: props.weather.name,
      country: props.weather.sys?.country || '',
      lat: props.weather.coord.lat,
      lon: props.weather.coord.lon,
    });
  }
};
</script>

<style scoped>
.current-weather {
  @apply backdrop-blur-lg;
}

.detail-item {
  @apply p-4 rounded-xl;
}
</style>
