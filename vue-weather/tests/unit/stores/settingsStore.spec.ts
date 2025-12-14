import { describe, it, expect, beforeEach } from '@jest/globals';
import { setActivePinia, createPinia } from 'pinia';
import { useSettingsStore } from '@/stores/settings';

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark-mode');
  });

  it('initializes with default settings', () => {
    const store = useSettingsStore();
    
    expect(store.units).toBe('metric');
    expect(store.darkMode).toBe(false);
    expect(store.language).toBe('en');
    expect(store.enableGeolocation).toBe(true);
    expect(store.enableNotifications).toBe(false);
    expect(store.autoRefresh).toBe(true);
    expect(store.refreshInterval).toBe(300000);
  });

  it('changes temperature units', () => {
    const store = useSettingsStore();

    store.setUnits('imperial');
    expect(store.units).toBe('imperial');

    store.setUnits('standard');
    expect(store.units).toBe('standard');
  });

  it('toggles dark mode', () => {
    const store = useSettingsStore();

    expect(store.darkMode).toBe(false);

    store.toggleDarkMode();
    expect(store.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    store.toggleDarkMode();
    expect(store.darkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('sets dark mode directly', () => {
    const store = useSettingsStore();

    store.setDarkMode(true);
    expect(store.darkMode).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);

    store.setDarkMode(false);
    expect(store.darkMode).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('changes language', () => {
    const store = useSettingsStore();

    store.setLanguage('fr');
    expect(store.language).toBe('fr');
  });

  it('toggles geolocation', () => {
    const store = useSettingsStore();

    store.setGeolocation(false);
    expect(store.enableGeolocation).toBe(false);

    store.setGeolocation(true);
    expect(store.enableGeolocation).toBe(true);
  });

  it('toggles notifications', () => {
    const store = useSettingsStore();

    store.setNotifications(true);
    expect(store.enableNotifications).toBe(true);

    store.setNotifications(false);
    expect(store.enableNotifications).toBe(false);
  });

  it('toggles auto refresh', () => {
    const store = useSettingsStore();

    store.setAutoRefresh(false);
    expect(store.autoRefresh).toBe(false);

    store.setAutoRefresh(true);
    expect(store.autoRefresh).toBe(true);
  });

  it('changes refresh interval', () => {
    const store = useSettingsStore();

    store.setRefreshInterval(600000);
    expect(store.refreshInterval).toBe(600000);
  });

  it('resets to default settings', () => {
    const store = useSettingsStore();

    store.setUnits('imperial');
    store.setDarkMode(true);
    store.setLanguage('fr');
    store.setAutoRefresh(false);

    store.resetSettings();

    expect(store.units).toBe('metric');
    expect(store.darkMode).toBe(false);
    expect(store.language).toBe('en');
    expect(store.autoRefresh).toBe(true);
  });

  it('returns all settings as object', () => {
    const store = useSettingsStore();

    const settings = store.allSettings;

    expect(settings).toEqual({
      units: 'metric',
      darkMode: false,
      language: 'en',
      enableGeolocation: true,
      enableNotifications: false,
      autoRefresh: true,
      refreshInterval: 300000,
    });
  });
});
