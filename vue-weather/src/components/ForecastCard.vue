<template>
  <Card class="forecast-card glass-panel hover:-translate-y-2 hover:scale-105 transition-all cursor-pointer">
    <template #content>
      <div class="text-center">
        <div class="forecast-day text-white text-lg font-semibold mb-3">{{ dayName }}</div>
        <div class="forecast-icon mx-auto">
          <img :src="iconUrl" :alt="description" class="w-20 h-20 drop-shadow-md" />
        </div>
        <div class="forecast-temps text-2xl font-bold text-white my-3">
          <span class="temp-max">{{ Math.round(tempMax) }}{{ unit }}</span>
          <span class="temp-separator opacity-60 mx-1">/</span>
          <span class="temp-min opacity-70">{{ Math.round(tempMin) }}{{ unit }}</span>
        </div>
        <div class="forecast-condition text-sm text-white/90 capitalize">{{ description }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
/**
 * ForecastCard Component
 * Displays a single day forecast card
 */
import { computed } from 'vue';
import Card from 'primevue/card';
import { getShortDayName, isToday } from '@/utils/dateFormatter';

interface Props {
  forecast: any;
  unit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  unit: '°C',
});

const dayName = computed(() => {
  const date = new Date(props.forecast.date * 1000);
  return isToday(date) ? 'Today' : getShortDayName(date);
});

const iconUrl = computed(() => {
  return `https://openweathermap.org/img/wn/${props.forecast.icon}@2x.png`;
});

const description = computed(() => props.forecast.condition);
const tempMax = computed(() => props.forecast.tempMax);
const tempMin = computed(() => props.forecast.tempMin);
</script>

<style scoped>
.forecast-card {
  @apply backdrop-blur-lg border border-white/20;
}

.forecast-card :deep(.p-card-content) {
  @apply p-5;
}
</style>
