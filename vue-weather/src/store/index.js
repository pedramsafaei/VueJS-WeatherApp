import Vue from 'vue';
import Vuex from 'vuex';
import weather from './modules/weather';
import favorites from './modules/favorites';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    weather,
    favorites,
    settings,
  },
  strict: process.env.NODE_ENV !== 'production',
});
