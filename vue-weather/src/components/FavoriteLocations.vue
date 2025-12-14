<template>
  <div v-if="favorites.length > 0" class="favorite-locations mx-auto max-w-4xl px-4 my-6">
    <h3 class="favorites-title text-white text-xl font-semibold mb-4 text-shadow">
      Favorite Locations
    </h3>
    <div class="favorites-list flex flex-wrap gap-3">
      <Chip
        v-for="location in favorites"
        :key="location.name"
        :label="`${location.name}, ${location.country}`"
        icon="pi pi-map-marker"
        removable
        class="favorite-chip glass-panel cursor-pointer hover:scale-105 transition-transform"
        @click="selectLocation(location)"
        @remove="removeLocation(location.name)"
      >
        <template #default>
          <span class="text-white font-medium">{{ location.name }}</span>
          <span class="text-white/70 ml-2 text-sm">{{ location.country }}</span>
        </template>
      </Chip>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * FavoriteLocations Component
 * Displays and manages favorite locations
 */
import { storeToRefs } from 'pinia';
import Chip from 'primevue/chip';
import { useFavoritesStore } from '@/stores/favorites';

const emit = defineEmits<{
  (e: 'select', location: any): void;
}>();

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const selectLocation = (location: any) => {
  emit('select', location);
};

const removeLocation = (name: string) => {
  favoritesStore.removeFavorite(name);
};
</script>

<style scoped>
.favorite-chip {
  @apply bg-white/20 backdrop-blur-md border border-white/30 text-white;
}

.favorite-chip:hover {
  @apply bg-white/30;
}
</style>
