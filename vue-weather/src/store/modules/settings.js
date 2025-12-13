/**
 * Vuex module for managing user settings and preferences
 */

const STORAGE_KEY = 'weather_settings';

const defaultSettings = {
  units: 'metric', // metric, imperial, kelvin
  darkMode: false,
  language: 'en',
  enableGeolocation: true,
  enableNotifications: false,
  autoRefresh: true,
  refreshInterval: 300000, // 5 minutes
};

const loadSettingsFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch (error) {
    console.error('Error loading settings from storage:', error);
    return defaultSettings;
  }
};

const saveSettingsToStorage = settings => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to storage:', error);
  }
};

const state = {
  ...loadSettingsFromStorage(),
};

const getters = {
  units: state => state.units,
  darkMode: state => state.darkMode,
  language: state => state.language,
  enableGeolocation: state => state.enableGeolocation,
  enableNotifications: state => state.enableNotifications,
  autoRefresh: state => state.autoRefresh,
  refreshInterval: state => state.refreshInterval,
  allSettings: state => state,
};

const mutations = {
  SET_UNITS(state, units) {
    state.units = units;
    saveSettingsToStorage(state);
  },
  SET_DARK_MODE(state, enabled) {
    state.darkMode = enabled;
    saveSettingsToStorage(state);
  },
  SET_LANGUAGE(state, language) {
    state.language = language;
    saveSettingsToStorage(state);
  },
  SET_GEOLOCATION(state, enabled) {
    state.enableGeolocation = enabled;
    saveSettingsToStorage(state);
  },
  SET_NOTIFICATIONS(state, enabled) {
    state.enableNotifications = enabled;
    saveSettingsToStorage(state);
  },
  SET_AUTO_REFRESH(state, enabled) {
    state.autoRefresh = enabled;
    saveSettingsToStorage(state);
  },
  SET_REFRESH_INTERVAL(state, interval) {
    state.refreshInterval = interval;
    saveSettingsToStorage(state);
  },
  RESET_SETTINGS(state) {
    Object.assign(state, defaultSettings);
    saveSettingsToStorage(state);
  },
};

const actions = {
  setUnits({ commit }, units) {
    commit('SET_UNITS', units);
  },
  toggleDarkMode({ commit, state }) {
    commit('SET_DARK_MODE', !state.darkMode);
  },
  setDarkMode({ commit }, enabled) {
    commit('SET_DARK_MODE', enabled);
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setGeolocation({ commit }, enabled) {
    commit('SET_GEOLOCATION', enabled);
  },
  setNotifications({ commit }, enabled) {
    commit('SET_NOTIFICATIONS', enabled);
  },
  setAutoRefresh({ commit }, enabled) {
    commit('SET_AUTO_REFRESH', enabled);
  },
  setRefreshInterval({ commit }, interval) {
    commit('SET_REFRESH_INTERVAL', interval);
  },
  resetSettings({ commit }) {
    commit('RESET_SETTINGS');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
