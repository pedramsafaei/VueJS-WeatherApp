<template>
  <div v-if="forecast" class="weather-forecast">
    <h2 class="forecast-title">5-Day Forecast</h2>
    <div class="forecast-grid">
      <ForecastCard
        v-for="(day, index) in dailyForecasts"
        :key="index"
        :forecast="day"
        :unit="temperatureUnit"
      />
    </div>
  </div>
</template>

<script>
/**
 * WeatherForecast Component
 * Displays 5-day weather forecast
 */
import { mapGetters } from 'vuex';
import ForecastCard from './ForecastCard.vue';
import { groupForecastByDay, getDailySummary, getTemperatureUnit } from '@/utils/weatherHelpers';

export default {
  name: 'WeatherForecast',
  components: {
    ForecastCard,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('settings', ['units']),
    temperatureUnit() {
      return getTemperatureUnit(this.units);
    },
    dailyForecasts() {
      if (!this.forecast || !this.forecast.list) return [];

      const grouped = groupForecastByDay(this.forecast.list);
      const days = Object.keys(grouped).slice(0, 5); // Get first 5 days

      return days.map(date => {
        const dayData = grouped[date];
        return getDailySummary(dayData);
      });
    },
  },
};
</script>

<style scoped>
.weather-forecast {
  margin: 32px auto;
  max-width: 1200px;
}

.forecast-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 0 16px;
}

@media (max-width: 768px) {
  .forecast-title {
    font-size: 24px;
  }

  .forecast-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }
}
</style>
