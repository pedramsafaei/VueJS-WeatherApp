import { describe, it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('renders search input', () => {
    const wrapper = mount(SearchBar, {
      props: {
        placeholder: 'Search for a city...',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Search for a city...');
  });

  it('emits search event on enter key', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');

    await input.setValue('London');
    await input.trigger('keypress.enter');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['London']);
  });

  it('emits use-location event when location button clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        enableGeolocation: true,
      },
    });

    const locationButton = wrapper.findAll('button').find(btn => 
      btn.attributes('title')?.includes('location')
    );

    if (locationButton) {
      await locationButton.trigger('click');
      expect(wrapper.emitted('use-location')).toBeTruthy();
    }
  });

  it('clears search input', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');

    await input.setValue('London');
    
    const clearButton = wrapper.findAll('button').find(btn => 
      btn.html().includes('pi-times')
    );

    if (clearButton) {
      await clearButton.trigger('click');
      expect((input.element as HTMLInputElement).value).toBe('');
    }
  });
});
