import { describe, it, expect, vi } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

describe('ErrorBoundary.vue', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
    ],
  });

  it('renders slot content when no error', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div class="test-content">Test Content</div>',
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.find('.error-boundary').exists()).toBe(false);
  });

  it('renders error message when error occurs', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Test Content</div>',
      },
      global: {
        plugins: [router],
      },
    });

    // Simulate error
    const error = new Error('Test error');
    wrapper.vm.$options.errorCaptured?.[0]?.(error, {}, 'test');
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Something went wrong');
  });

  it('has try again button when error occurs', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Test Content</div>',
      },
      global: {
        plugins: [router],
      },
    });

    const error = new Error('Test error');
    wrapper.vm.$options.errorCaptured?.[0]?.(error, {}, 'test');
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
