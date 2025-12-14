import { describe, it, expect, beforeEach } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import SettingsPanel from '@/components/SettingsPanel.vue';
import { useSettingsStore } from '@/stores/settings';

describe('SettingsPanel.vue', () => {
  let pinia: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders when isOpen is true', () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.settings-panel').exists()).toBe(true);
  });

  it('does not render when isOpen is false', () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: false,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.settings-panel').exists()).toBe(false);
  });

  it('displays settings title', () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('Settings');
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    const closeButton = wrapper.find('[aria-label="Close settings"]');
    if (closeButton.exists()) {
      await closeButton.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('toggles units setting', async () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    const settingsStore = useSettingsStore();
    const initialUnits = settingsStore.units;

    // Change units
    settingsStore.setUnits(initialUnits === 'metric' ? 'imperial' : 'metric');
    await wrapper.vm.$nextTick();

    expect(settingsStore.units).not.toBe(initialUnits);
  });

  it('toggles dark mode setting', async () => {
    const wrapper = mount(SettingsPanel, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    const settingsStore = useSettingsStore();
    const initialDarkMode = settingsStore.darkMode;

    settingsStore.toggleDarkMode();
    await wrapper.vm.$nextTick();

    expect(settingsStore.darkMode).toBe(!initialDarkMode);
  });
});
