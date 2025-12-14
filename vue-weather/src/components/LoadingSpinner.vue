<template>
  <div class="loading-spinner glass-panel p-12 mx-auto max-w-md">
    <ProgressSpinner
      style="width: 60px; height: 60px"
      strokeWidth="4"
      fill="transparent"
      animationDuration="1s"
      class="mx-auto"
    />
    <Skeleton v-if="showSkeleton" height="2rem" class="mt-8" />
    <Skeleton v-if="showSkeleton" height="2rem" class="mt-4" />
    <Skeleton v-if="showSkeleton" height="2rem" class="mt-4" />
    <p v-if="message" class="loading-message mt-6 text-white text-center text-shadow">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * LoadingSpinner Component
 * Displays loading state with skeleton loaders
 */
import { withDefaults } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';

interface Props {
  message?: string;
  showSkeleton?: boolean;
}

withDefaults(defineProps<Props>(), {
  message: 'Loading weather data...',
  showSkeleton: true,
});
</script>

<style scoped>
.loading-spinner {
  @apply flex flex-col items-center justify-center;
}
</style>
