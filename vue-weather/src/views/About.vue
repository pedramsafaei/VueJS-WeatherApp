<template>
  <div class="about-view glass-panel mx-auto max-w-4xl p-8 text-white">
    <h1 class="text-4xl font-bold mb-6">About Weather Pro</h1>
    
    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-semibold mb-3">📱 Modern Weather Application</h2>
        <p class="text-white/90">
          Weather Pro is a professional, production-ready weather application built with Vue 3,
          TypeScript, and modern web technologies. It provides real-time weather information
          with a beautiful, intuitive interface.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">✨ Features</h2>
        <ul class="list-disc list-inside space-y-2 text-white/90">
          <li>Real-time weather data from OpenWeatherMap</li>
          <li>5-day weather forecast</li>
          <li>Geolocation support</li>
          <li>Favorite locations management</li>
          <li>Dark mode support</li>
          <li>Progressive Web App (PWA) capabilities</li>
          <li>Responsive design for all devices</li>
          <li>Auto-refresh functionality</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">🛠️ Technology Stack</h2>
        <ul class="list-disc list-inside space-y-2 text-white/90">
          <li>Vue 3 with Composition API</li>
          <li>TypeScript for type safety</li>
          <li>Pinia for state management</li>
          <li>PrimeVue component library</li>
          <li>Tailwind CSS for styling</li>
          <li>Vite for fast development</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">📊 Performance</h2>
        <p class="text-white/90">
          This application is optimized for performance with code splitting, lazy loading,
          and efficient caching strategies. Web vitals are monitored to ensure the best
          user experience.
        </p>
      </section>

      <div class="mt-8 pt-6 border-t border-white/20">
        <p class="text-sm text-white/70 text-center">
          Built with ❤️ by Pedram Safaei | Powered by OpenWeatherMap API
        </p>
      </div>
    </div>

    <div class="mt-6 text-center">
      <Button 
        label="Back to Home" 
        icon="pi pi-home" 
        @click="$router.push('/')"
        class="p-button-outlined"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped>
.about-view {
  margin-top: 2rem;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
