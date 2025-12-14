import { describe, it, expect, beforeEach } from '@jest/globals';
import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('initializes with empty favorites', () => {
    const store = useFavoritesStore();
    
    expect(store.favorites).toEqual([]);
    expect(store.favoritesCount).toBe(0);
  });

  it('adds favorite location', () => {
    const store = useFavoritesStore();
    const location = {
      name: 'London',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1278,
    };

    store.addFavorite(location);

    expect(store.favorites.length).toBe(1);
    expect(store.favorites[0]).toMatchObject(location);
    expect(store.favorites[0].addedAt).toBeDefined();
    expect(store.favoritesCount).toBe(1);
    expect(store.isFavorite('London')).toBe(true);
  });

  it('does not add duplicate favorites', () => {
    const store = useFavoritesStore();
    const location = {
      name: 'Paris',
      country: 'FR',
      lat: 48.8566,
      lon: 2.3522,
    };

    store.addFavorite(location);
    store.addFavorite(location);

    expect(store.favorites.length).toBe(1);
  });

  it('removes favorite location', () => {
    const store = useFavoritesStore();
    const location = {
      name: 'Berlin',
      country: 'DE',
      lat: 52.52,
      lon: 13.405,
    };

    store.addFavorite(location);
    expect(store.favorites.length).toBe(1);

    store.removeFavorite('Berlin');
    expect(store.favorites.length).toBe(0);
    expect(store.isFavorite('Berlin')).toBe(false);
  });

  it('clears all favorites', () => {
    const store = useFavoritesStore();

    store.addFavorite({ name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 });
    store.addFavorite({ name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 });

    expect(store.favorites.length).toBe(2);

    store.clearFavorites();
    expect(store.favorites.length).toBe(0);
  });

  it('reorders favorites', () => {
    const store = useFavoritesStore();
    const location1 = { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278, addedAt: '2023-01-01' };
    const location2 = { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522, addedAt: '2023-01-02' };

    store.addFavorite(location1);
    store.addFavorite(location2);

    expect(store.favorites[0].name).toBe('London');

    store.reorderFavorites([location2, location1]);
    expect(store.favorites[0].name).toBe('Paris');
  });

  it('checks if location is favorite (case insensitive)', () => {
    const store = useFavoritesStore();
    
    store.addFavorite({ name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 });

    expect(store.isFavorite('Tokyo')).toBe(true);
    expect(store.isFavorite('tokyo')).toBe(true);
    expect(store.isFavorite('TOKYO')).toBe(true);
    expect(store.isFavorite('Osaka')).toBe(false);
  });
});