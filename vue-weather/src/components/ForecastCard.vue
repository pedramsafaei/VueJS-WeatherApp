<template>
  <div class="forecast-card">
    <div class="forecast-day">{{ dayName }}</div>
    <div class="forecast-icon">
      <img :src="iconUrl" :alt="description" />
    </div>
    <div class="forecast-temps">
      <span class="temp-max">{{ Math.round(tempMax) }}{{ unit }}</span>
      <span class="temp-separator">/</span>
      <span class="temp-min">{{ Math.round(tempMin) }}{{ unit }}</span>
    </div>
    <div class="forecast-condition">{{ description }}</div>
  </div>
</template>

<script>
/**
 * ForecastCard Component
 * Displays a single day forecast card
 */
import { getShortDayName, isToday } from '@/utils/dateFormatter';

export default {
  name: 'ForecastCard',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      default: '°C',
    },
  },
  computed: {
    dayName() {
      const date = new Date(this.forecast.date * 1000);
      return isToday(date) ? 'Today' : getShortDayName(date);
    },
    iconUrl() {
      return `https://openweathermap.org/img/wn/${this.forecast.icon}@2x.png`;
    },
    description() {
      return this.forecast.condition;
    },
    tempMax() {
      return this.forecast.tempMax;
    },
    tempMin() {
      return this.forecast.tempMin;
    },
  },
};
</script>

<style scoped>
.forecast-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.forecast-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.forecast-day {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.forecast-icon img {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.forecast-temps {
  font-size: 24px;
  font-weight: 700;
  margin: 12px 0;
}

.temp-max {
  color: white;
}

.temp-separator {
  margin: 0 4px;
  opacity: 0.6;
}

.temp-min {
  opacity: 0.7;
}

.forecast-condition {
  font-size: 14px;
  opacity: 0.9;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .forecast-card {
    padding: 16px;
  }

  .forecast-icon img {
    width: 60px;
    height: 60px;
  }

  .forecast-temps {
    font-size: 20px;
  }
}
</style>
