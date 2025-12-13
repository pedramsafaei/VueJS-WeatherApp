import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('renders search input', () => {
    const wrapper = shallowMount(SearchBar);
    expect(wrapper.find('.search-input').exists()).toBe(true);
  });

  it('emits search event on enter key', async () => {
    const wrapper = shallowMount(SearchBar);
    const input = wrapper.find('.search-input');
    
    await input.setValue('London');
    await input.trigger('keypress.enter');
    
    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0]).toEqual(['London']);
  });

  it('shows clear button when search query exists', async () => {
    const wrapper = shallowMount(SearchBar);
    
    expect(wrapper.find('.clear-button').exists()).toBe(false);
    
    await wrapper.setData({ searchQuery: 'Paris' });
    
    expect(wrapper.find('.clear-button').exists()).toBe(true);
  });

  it('clears search on clear button click', async () => {
    const wrapper = shallowMount(SearchBar);
    await wrapper.setData({ searchQuery: 'Berlin' });
    
    await wrapper.find('.clear-button').trigger('click');
    
    expect(wrapper.vm.searchQuery).toBe('');
    expect(wrapper.emitted('clear')).toBeTruthy();
  });

  it('shows geolocation button when enabled', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: { enableGeolocation: true },
    });
    
    expect(wrapper.find('.location-button').exists()).toBe(true);
  });

  it('emits use-location event on location button click', async () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: { enableGeolocation: true },
    });
    
    await wrapper.find('.location-button').trigger('click');
    
    expect(wrapper.emitted('use-location')).toBeTruthy();
  });
});
