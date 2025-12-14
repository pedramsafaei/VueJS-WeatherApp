<template>
  <div v-if="hasError" class="error-boundary glass-panel mx-auto max-w-2xl p-8 text-center">
    <div class="error-icon text-6xl mb-4">⚠️</div>
    <h2 class="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
    <p class="text-white/80 mb-6">{{ errorMessage }}</p>
    
    <div class="space-x-4">
      <Button 
        label="Try Again" 
        icon="pi pi-refresh" 
        @click="resetError"
        severity="secondary"
      />
      <Button 
        label="Go Home" 
        icon="pi pi-home" 
        @click="goHome"
        outlined
      />
    </div>

    <details v-if="errorDetails" class="mt-6 text-left">
      <summary class="cursor-pointer text-white/60 hover:text-white/80 mb-2">
        Technical Details
      </summary>
      <pre class="text-xs text-white/60 bg-black/20 p-4 rounded overflow-auto max-h-48">{{ errorDetails }}</pre>
    </details>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, provide } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

const hasError = ref(false);
const errorMessage = ref('An unexpected error occurred. Please try again.');
const errorDetails = ref('');

// Provide error handler to child components
provide('errorHandler', (error: Error) => {
  hasError.value = true;
  errorMessage.value = error.message || 'An unexpected error occurred';
  errorDetails.value = error.stack || '';
});

onErrorCaptured((err: Error, instance, info) => {
  hasError.value = true;
  errorMessage.value = err.message || 'An unexpected error occurred';
  errorDetails.value = `${err.stack}\n\nComponent: ${instance?.$options?.name || 'Unknown'}\nInfo: ${info}`;
  
  // Log to console in development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', err, info);
  }
  
  // Prevent error from propagating
  return false;
});

const resetError = () => {
  hasError.value = false;
  errorMessage.value = '';
  errorDetails.value = '';
  window.location.reload();
};

const goHome = () => {
  hasError.value = false;
  errorMessage.value = '';
  errorDetails.value = '';
  router.push('/');
};
</script>

<style scoped>
.error-boundary {
  margin-top: 4rem;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}
</style>
