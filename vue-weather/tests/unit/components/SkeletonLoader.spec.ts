import { describe, it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

describe('SkeletonLoader.vue', () => {
  it('renders skeleton loader', () => {
    const wrapper = mount(SkeletonLoader);
    expect(wrapper.find('.skeleton-loader').exists()).toBe(true);
  });

  it('displays current weather skeleton', () => {
    const wrapper = mount(SkeletonLoader);
    expect(wrapper.find('.glass-panel').exists()).toBe(true);
  });

  it('displays multiple skeleton cards', () => {
    const wrapper = mount(SkeletonLoader);
    const skeletonCards = wrapper.findAll('.glass-panel-dark');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('has pulse animation class', () => {
    const wrapper = mount(SkeletonLoader);
    expect(wrapper.find('.animate-pulse').exists()).toBe(true);
  });
});
