/**
 * Vuex module for managing weather data state
 */

const state = {
  currentWeather: null,
  forecast: null,
  weatherAlerts: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const getters = {
  currentWeather: state => state.currentWeather,
  forecast: state => state.forecast,
  weatherAlerts: state => state.weatherAlerts,
  isLoading: state => state.loading,
  error: state => state.error,
  lastUpdated: state => state.lastUpdated,
  hasWeatherData: state => state.currentWeather !== null,
};

const mutations = {
  SET_CURRENT_WEATHER(state, weather) {
    state.currentWeather = weather;
    state.lastUpdated = new Date();
    state.error = null;
  },
  SET_FORECAST(state, forecast) {
    state.forecast = forecast;
  },
  SET_WEATHER_ALERTS(state, alerts) {
    state.weatherAlerts = alerts;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.loading = false;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  CLEAR_WEATHER_DATA(state) {
    state.currentWeather = null;
    state.forecast = null;
    state.weatherAlerts = [];
    state.error = null;
  },
};

const actions = {
  /**
   * Fetch current weather data
   * @param {Object} context - Vuex context
   * @param {string} location - City name or coordinates
   */
  async fetchCurrentWeather({ commit }, location) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    // Service layer will handle the actual API call
    // This is set up for integration with weatherService
  },

  /**
   * Fetch weather forecast
   * @param {Object} context - Vuex context
   * @param {string} location - City name or coordinates
   */
  async fetchForecast({ commit }, location) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    // Service layer will handle the actual API call
  },

  setCurrentWeather({ commit }, weather) {
    commit('SET_CURRENT_WEATHER', weather);
  },

  setForecast({ commit }, forecast) {
    commit('SET_FORECAST', forecast);
  },

  setWeatherAlerts({ commit }, alerts) {
    commit('SET_WEATHER_ALERTS', alerts);
  },

  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading);
  },

  setError({ commit }, error) {
    commit('SET_ERROR', error);
  },

  clearError({ commit }) {
    commit('CLEAR_ERROR');
  },

  clearWeatherData({ commit }) {
    commit('CLEAR_WEATHER_DATA');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
