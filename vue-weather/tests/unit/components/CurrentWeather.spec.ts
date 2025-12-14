import { describe, it, expect, beforeEach } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CurrentWeather from '@/components/CurrentWeather.vue';
import { useSettingsStore } from '@/stores/settings';
import { useFavoritesStore } from '@/stores/favorites';
import { useWeatherStore } from '@/stores/weather';

describe('CurrentWeather.vue', () => {
  let pinia: any;

  const mockWeatherData = {
    name: 'London',
    sys: {
      country: 'GB',
      sunrise: 1609459200,
      sunset: 1609488000,
    },
    coord: {
      lat: 51.5074,
      lon: -0.1278,
    },
    main: {
      temp: 15,
      feels_like: 13,
      humidity: 75,
      pressure: 1013,
    },
    weather: [
      {
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
    wind: {
      speed: 5.5,
      deg: 180,
    },
    visibility: 10000,
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders weather data correctly', () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        weather: mockWeatherData,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('London');
    expect(wrapper.text()).toContain('GB');
    expect(wrapper.text()).toContain('15');
  });

  it('displays weather details', () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        weather: mockWeatherData,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('13');
    expect(wrapper.text()).toContain('75%');
    expect(wrapper.text()).toContain('5.5');
    expect(wrapper.text()).toContain('1013');
  });

  it('handles favorite toggle', async () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        weather: mockWeatherData,
      },
      global: {
        plugins: [pinia],
      },
    });

    const favoritesStore = useFavoritesStore();
    const addFavoriteSpy = jest.spyOn(favoritesStore, 'addFavorite');

    const favoriteButton = wrapper.findAll('button').find(btn => 
      btn.text().includes('Add to Favorites')
    );
    
    if (favoriteButton) {
      await favoriteButton.trigger('click');
      expect(addFavoriteSpy).toHaveBeenCalledWith({
        name: 'London',
        country: 'GB',
        lat: 51.5074,
        lon: -0.1278,
      });
    }
  });

  it('uses correct temperature unit', () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        weather: mockWeatherData,
      },
      global: {
        plugins: [pinia],
      },
    });

    const settingsStore = useSettingsStore();
    expect(wrapper.text()).toContain('°C');

    settingsStore.setUnits('imperial');
    wrapper.vm.$forceUpdate();
  });
});
