import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface FavoriteLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: string;
}

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favorites = ref<FavoriteLocation[]>([]);

  // Getters
  const favoritesCount = computed(() => favorites.value.length);
  
  const isFavorite = computed(() => (location: string) => {
    return favorites.value.some(
      fav => fav.name.toLowerCase() === location.toLowerCase()
    );
  });

  // Actions
  function addFavorite(location: Omit<FavoriteLocation, 'addedAt'>) {
    if (!favorites.value.some(fav => fav.name === location.name)) {
      favorites.value.push({
        ...location,
        addedAt: new Date().toISOString(),
      });
    }
  }

  function removeFavorite(locationName: string) {
    favorites.value = favorites.value.filter(fav => fav.name !== locationName);
  }

  function clearFavorites() {
    favorites.value = [];
  }

  function reorderFavorites(newFavorites: FavoriteLocation[]) {
    favorites.value = newFavorites;
  }

  return {
    // State
    favorites,
    // Getters
    favoritesCount,
    isFavorite,
    // Actions
    addFavorite,
    removeFavorite,
    clearFavorites,
    reorderFavorites,
  };
}, {
  persist: {
    key: 'weather_favorites',
    storage: localStorage,
  },
});
