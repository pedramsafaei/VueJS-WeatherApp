<template>
  <ErrorBoundary>
    <div id="app" :class="['app-container', themeClass, { 'dark-mode': darkMode }]">
      <Toast />
      <main class="main-content">
        <!-- Header -->
        <header class="app-header">
          <div class="header-content">
            <h1 class="app-title cursor-pointer" @click="$router.push('/')">🌤️ Weather Pro</h1>
            <div class="flex items-center gap-4">
              <Button
                icon="pi pi-info-circle"
                rounded
                text
                severity="secondary"
                @click="$router.push('/about')"
                aria-label="About"
                class="text-white hover:bg-white/20"
              />
              <Button
                icon="pi pi-moon"
                v-if="!darkMode"
                rounded
                text
                severity="secondary"
                @click="settingsStore.toggleDarkMode()"
                aria-label="Toggle dark mode"
                class="text-white hover:bg-white/20"
              />
              <Button
                icon="pi pi-sun"
                v-else
                rounded
                text
                severity="secondary"
                @click="settingsStore.toggleDarkMode()"
                aria-label="Toggle light mode"
                class="text-white hover:bg-white/20"
              />
              <Button
                icon="pi pi-cog"
                rounded
                text
                severity="secondary"
                @click="toggleSettings"
                aria-label="Open settings"
                class="text-white hover:bg-white/20"
              />
            </div>
          </div>
        </header>

        <!-- Router View -->
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>

        <!-- Footer -->
        <footer class="app-footer">
          <p>
            Powered by
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </main>

      <!-- Settings Panel -->
      <SettingsPanel
        :is-open="showSettings"
        @close="toggleSettings"
        @units-changed="handleUnitsChange"
      />

      <!-- Overlay for settings -->
      <div
        v-if="showSettings"
        class="overlay"
        @click="toggleSettings"
      ></div>

      <!-- Install Prompt -->
      <InstallPrompt />
    </div>
  </ErrorBoundary>
</template>

<script setup lang="ts">
/**
 * Main App Component
 * Root component managing the application state and layout
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import SettingsPanel from './components/SettingsPanel.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import InstallPrompt from './components/InstallPrompt.vue';
import { getWeatherTheme, isDayTime } from './utils/weatherHelpers';
import { useWeatherStore } from './stores/weather';
import { useSettingsStore } from './stores/settings';
import { initPerformanceMonitoring } from './utils/performance';

// Stores
const weatherStore = useWeatherStore();
const settingsStore = useSettingsStore();
const toast = useToast();

// Store refs
const { currentWeather } = storeToRefs(weatherStore);
const { darkMode, autoRefresh, refreshInterval } = storeToRefs(settingsStore);

// Local state
const showSettings = ref(false);
const autoRefreshInterval = ref<number | null>(null);

// Computed
const themeClass = computed(() => {
  if (!currentWeather.value || !currentWeather.value.weather) {
    return 'default-day';
  }
  const isDay = isDayTime(
    Date.now() / 1000,
    currentWeather.value.sys?.sunrise || 0,
    currentWeather.value.sys?.sunset || 0
  );
  return getWeatherTheme(currentWeather.value.weather[0].main, isDay);
});

// Methods
const initializeApp = async () => {
  // Initialize dark mode
  settingsStore.initializeDarkMode();
  
  // Initialize performance monitoring
  initPerformanceMonitoring();
};

const handleUnitsChange = async () => {
  // Handled in Home view
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const startAutoRefresh = () => {
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value);
  }
  
  autoRefreshInterval.value = window.setInterval(() => {
    // Trigger refresh event
    window.dispatchEvent(new CustomEvent('auto-refresh'));
  }, refreshInterval.value);
};

const stopAutoRefresh = () => {
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value);
    autoRefreshInterval.value = null;
  }
};

// Watchers
watch(autoRefresh, (enabled) => {
  if (enabled) {
    startAutoRefresh();
  } else {
    stopAutoRefresh();
  }
});

watch(refreshInterval, () => {
  if (autoRefresh.value) {
    stopAutoRefresh();
    startAutoRefresh();
  }
});

// Lifecycle
onMounted(() => {
  initializeApp();

  if (autoRefresh.value) {
    startAutoRefresh();
  }
});

onUnmounted(() => {
  stopAutoRefresh();
});
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  transition: background 0.5s ease;
}

/* Theme Backgrounds */
.sunny-day {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.sunny-night {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.cloudy-day {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
}

.cloudy-night {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.rainy-day {
  background: linear-gradient(135deg, #536976 0%, #292e49 100%);
}

.rainy-night {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.stormy-day,
.stormy-night {
  background: linear-gradient(135deg, #373b44 0%, #4286f4 100%);
}

.snowy-day {
  background: linear-gradient(135deg, #e6dada 0%, #274046 100%);
}

.snowy-night {
  background: linear-gradient(135deg, #e6e9f0 0%, #2c3e50 100%);
}

.foggy-day,
.foggy-night {
  background: linear-gradient(135deg, #757f9a 0%, #d7dde8 100%);
}

.default-day {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-container {
  position: relative;
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.5)
  );
}

/* Header */
.app-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  color: white;
  font-size: 32px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.settings-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Welcome Message */
.welcome-message {
  text-align: center;
  padding: 80px 24px;
  color: white;
}

.welcome-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome-text {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.welcome-icon {
  font-size: 80px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 32px 24px;
  color: white;
  font-size: 14px;
  opacity: 0.8;
}

.app-footer a {
  color: white;
  text-decoration: underline;
}

.app-footer a:hover {
  opacity: 0.8;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dark Mode Adjustments */
.dark-mode .main-content {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.7)
  );
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .app-title {
    font-size: 24px;
  }

  .settings-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .welcome-title {
    font-size: 28px;
  }

  .welcome-text {
    font-size: 16px;
  }

  .welcome-icon {
    font-size: 60px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles for accessibility */
button:focus,
input:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* Route transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
