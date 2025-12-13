<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script>
/**
 * LoadingSpinner Component
 * Displays loading state with optional message
 */
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Loading weather data...',
    },
  },
};
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-message {
  color: white;
  margin-top: 24px;
  font-size: 18px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
