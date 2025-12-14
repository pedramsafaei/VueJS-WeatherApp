import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

type Units = 'metric' | 'imperial' | 'kelvin';

interface Settings {
  units: Units;
  darkMode: boolean;
  language: string;
  enableGeolocation: boolean;
  enableNotifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}

const defaultSettings: Settings = {
  units: 'metric',
  darkMode: false,
  language: 'en',
  enableGeolocation: true,
  enableNotifications: false,
  autoRefresh: true,
  refreshInterval: 300000, // 5 minutes
};

export const useSettingsStore = defineStore('settings', () => {
  // State
  const units = ref<Units>(defaultSettings.units);
  const darkMode = ref(defaultSettings.darkMode);
  const language = ref(defaultSettings.language);
  const enableGeolocation = ref(defaultSettings.enableGeolocation);
  const enableNotifications = ref(defaultSettings.enableNotifications);
  const autoRefresh = ref(defaultSettings.autoRefresh);
  const refreshInterval = ref(defaultSettings.refreshInterval);

  // Getters
  const allSettings = computed((): Settings => ({
    units: units.value,
    darkMode: darkMode.value,
    language: language.value,
    enableGeolocation: enableGeolocation.value,
    enableNotifications: enableNotifications.value,
    autoRefresh: autoRefresh.value,
    refreshInterval: refreshInterval.value,
  }));

  // Actions
  function setUnits(newUnits: Units) {
    units.value = newUnits;
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value;
    applyDarkMode();
  }

  function setDarkMode(enabled: boolean) {
    darkMode.value = enabled;
    applyDarkMode();
  }

  function applyDarkMode() {
    if (darkMode.value) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }

  function setLanguage(newLanguage: string) {
    language.value = newLanguage;
  }

  function setGeolocation(enabled: boolean) {
    enableGeolocation.value = enabled;
  }

  function setNotifications(enabled: boolean) {
    enableNotifications.value = enabled;
  }

  function setAutoRefresh(enabled: boolean) {
    autoRefresh.value = enabled;
  }

  function setRefreshInterval(interval: number) {
    refreshInterval.value = interval;
  }

  function resetSettings() {
    units.value = defaultSettings.units;
    darkMode.value = defaultSettings.darkMode;
    language.value = defaultSettings.language;
    enableGeolocation.value = defaultSettings.enableGeolocation;
    enableNotifications.value = defaultSettings.enableNotifications;
    autoRefresh.value = defaultSettings.autoRefresh;
    refreshInterval.value = defaultSettings.refreshInterval;
    applyDarkMode();
  }

  // Initialize dark mode on store creation
  function initializeDarkMode() {
    // Check system preference if darkMode is not explicitly set
    if (!localStorage.getItem('weather_settings')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.value = prefersDark;
    }
    applyDarkMode();
  }

  return {
    // State
    units,
    darkMode,
    language,
    enableGeolocation,
    enableNotifications,
    autoRefresh,
    refreshInterval,
    // Getters
    allSettings,
    // Actions
    setUnits,
    toggleDarkMode,
    setDarkMode,
    setLanguage,
    setGeolocation,
    setNotifications,
    setAutoRefresh,
    setRefreshInterval,
    resetSettings,
    initializeDarkMode,
  };
}, {
  persist: {
    key: 'weather_settings',
    storage: localStorage,
  },
});
