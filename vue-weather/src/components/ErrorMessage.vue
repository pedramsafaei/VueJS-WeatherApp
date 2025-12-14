<template>
  <div class="error-message glass-panel p-12 mx-auto max-w-2xl text-center animate-slide-up">
    <i class="pi pi-exclamation-triangle text-6xl text-yellow-300 mb-4"></i>
    <h3 class="error-title text-white text-3xl font-bold mb-4 text-shadow">{{ title }}</h3>
    <p class="error-text text-white text-lg leading-relaxed mb-6 text-shadow">{{ message }}</p>
    <Button
      v-if="showRetry"
      label="Try Again"
      icon="pi pi-refresh"
      severity="secondary"
      rounded
      @click="emit('retry')"
      class="btn-primary"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorMessage Component
 * Displays user-friendly error messages
 */
import { withDefaults } from 'vue';
import Button from 'primevue/button';

interface Props {
  title?: string;
  message: string;
  showRetry?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'Oops!',
  showRetry: true,
});

const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<style scoped>
.error-message {
  @apply flex flex-col items-center justify-center;
}
</style>
