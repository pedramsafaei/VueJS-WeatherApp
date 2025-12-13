<template>
  <div v-if="favorites.length > 0" class="favorite-locations">
    <h3 class="favorites-title">Favorite Locations</h3>
    <div class="favorites-list">
      <button
        v-for="location in favorites"
        :key="location.name"
        class="favorite-item"
        @click="selectLocation(location)"
      >
        <span class="location-name">{{ location.name }}</span>
        <span class="location-country">{{ location.country }}</span>
        <button
          class="remove-button"
          aria-label="Remove from favorites"
          @click.stop="removeLocation(location.name)"
        >
          ✕
        </button>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * FavoriteLocations Component
 * Displays and manages favorite locations
 */
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FavoriteLocations',
  computed: {
    ...mapGetters('favorites', ['favorites']),
  },
  methods: {
    ...mapActions('favorites', ['removeFavorite']),
    selectLocation(location) {
      this.$emit('select', location);
    },
    removeLocation(name) {
      this.removeFavorite(name);
    },
  },
};
</script>

<style scoped>
.favorite-locations {
  margin: 24px auto;
  max-width: 800px;
  padding: 0 16px;
}

.favorites-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.favorite-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 10px 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.favorite-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.location-name {
  font-weight: 600;
  margin-right: 8px;
}

.location-country {
  font-size: 14px;
  opacity: 0.8;
  margin-right: 8px;
}

.remove-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
  transition: all 0.2s ease;
  margin-left: 4px;
}

.remove-button:hover {
  background: rgba(255, 100, 100, 0.6);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .favorites-title {
    font-size: 18px;
  }

  .favorite-item {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>
