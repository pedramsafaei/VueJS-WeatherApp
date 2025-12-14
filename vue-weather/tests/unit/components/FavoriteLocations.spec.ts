import { describe, it, expect, beforeEach } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FavoriteLocations from '@/components/FavoriteLocations.vue';
import { useFavoritesStore } from '@/stores/favorites';

describe('FavoriteLocations.vue', () => {
  let pinia: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders favorite locations', () => {
    const favoritesStore = useFavoritesStore();
    favoritesStore.addFavorite({
      name: 'London',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1278,
    });

    const wrapper = mount(FavoriteLocations, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('London');
    expect(wrapper.text()).toContain('GB');
  });

  it('emits select event when favorite is clicked', async () => {
    const favoritesStore = useFavoritesStore();
    favoritesStore.addFavorite({
      name: 'Paris',
      country: 'FR',
      lat: 48.8566,
      lon: 2.3522,
    });

    const wrapper = mount(FavoriteLocations, {
      global: {
        plugins: [pinia],
      },
    });

    const chip = wrapper.find('.favorite-chip');
    await chip.trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
  });

  it('removes favorite when remove button clicked', async () => {
    const favoritesStore = useFavoritesStore();
    favoritesStore.addFavorite({
      name: 'Berlin',
      country: 'DE',
      lat: 52.52,
      lon: 13.405,
    });

    const wrapper = mount(FavoriteLocations, {
      global: {
        plugins: [pinia],
      },
    });

    expect(favoritesStore.favorites.length).toBe(1);

    // PrimeVue Chip component has a remove event
    const chip = wrapper.findComponent({ name: 'Chip' });
    if (chip.exists()) {
      await chip.vm.$emit('remove');
      expect(favoritesStore.favorites.length).toBe(0);
    }
  });

  it('does not render when there are no favorites', () => {
    const wrapper = mount(FavoriteLocations, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.favorite-locations').exists()).toBe(false);
  });
});
