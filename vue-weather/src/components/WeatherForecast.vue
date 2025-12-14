<template>
  <div v-if="forecast" class="weather-forecast mx-auto max-w-6xl px-4 my-8">
    <h2 class="forecast-title text-white text-3xl font-bold text-center mb-6 text-shadow">
      5-Day Forecast
    </h2>
    <div class="forecast-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ForecastCard
        v-for="(day, index) in dailyForecasts"
        :key="index"
        :forecast="day"
        :unit="temperatureUnit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * WeatherForecast Component
 * Displays 5-day weather forecast
 */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import ForecastCard from './ForecastCard.vue';
import { groupForecastByDay, getDailySummary, getTemperatureUnit } from '@/utils/weatherHelpers';
import { useSettingsStore } from '@/stores/settings';

interface Props {
  forecast: any;
}

const props = defineProps<Props>();

const settingsStore = useSettingsStore();
const { units } = storeToRefs(settingsStore);

const temperatureUnit = computed(() => getTemperatureUnit(units.value));

const dailyForecasts = computed(() => {
  if (!props.forecast || !props.forecast.list) return [];

  const grouped = groupForecastByDay(props.forecast.list);
  const days = Object.keys(grouped).slice(0, 5);

  return days.map(date => {
    const dayData = grouped[date];
    return getDailySummary(dayData);
  });
});
</script>

<style scoped>
.weather-forecast {
  @apply animate-slide-up;
}
</style>
