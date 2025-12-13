<template>
  <div class="error-message">
    <div class="error-icon">⚠️</div>
    <h3 class="error-title">{{ title }}</h3>
    <p class="error-text">{{ message }}</p>
    <button v-if="showRetry" class="retry-button" @click="$emit('retry')">Try Again</button>
  </div>
</template>

<script>
/**
 * ErrorMessage Component
 * Displays user-friendly error messages
 */
export default {
  name: 'ErrorMessage',
  props: {
    title: {
      type: String,
      default: 'Oops!',
    },
    message: {
      type: String,
      required: true,
    },
    showRetry: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.error-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.error-text {
  color: white;
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 24px 0;
  max-width: 500px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.retry-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 12px 32px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
