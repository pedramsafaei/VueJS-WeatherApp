/**
 * Vuex module for managing favorite locations
 */

const STORAGE_KEY = 'weather_favorites';

const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
};

const saveFavoritesToStorage = favorites => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
  }
};

const state = {
  favorites: loadFavoritesFromStorage(),
};

const getters = {
  favorites: state => state.favorites,
  isFavorite: state => location => {
    return state.favorites.some(
      fav => fav.name.toLowerCase() === location.toLowerCase()
    );
  },
  favoritesCount: state => state.favorites.length,
};

const mutations = {
  ADD_FAVORITE(state, location) {
    if (!state.favorites.some(fav => fav.name === location.name)) {
      state.favorites.push({
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        addedAt: new Date().toISOString(),
      });
      saveFavoritesToStorage(state.favorites);
    }
  },
  REMOVE_FAVORITE(state, locationName) {
    state.favorites = state.favorites.filter(fav => fav.name !== locationName);
    saveFavoritesToStorage(state.favorites);
  },
  CLEAR_FAVORITES(state) {
    state.favorites = [];
    saveFavoritesToStorage(state.favorites);
  },
  REORDER_FAVORITES(state, favorites) {
    state.favorites = favorites;
    saveFavoritesToStorage(state.favorites);
  },
};

const actions = {
  addFavorite({ commit }, location) {
    commit('ADD_FAVORITE', location);
  },
  removeFavorite({ commit }, locationName) {
    commit('REMOVE_FAVORITE', locationName);
  },
  clearFavorites({ commit }) {
    commit('CLEAR_FAVORITES');
  },
  reorderFavorites({ commit }, favorites) {
    commit('REORDER_FAVORITES', favorites);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
