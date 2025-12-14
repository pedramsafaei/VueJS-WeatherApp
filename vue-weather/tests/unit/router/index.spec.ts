import { describe, it, expect, beforeEach } from '@jest/globals';
import { createRouter, createMemoryHistory } from 'vue-router';
import router from '@/router';

describe('Router', () => {
  it('has correct routes defined', () => {
    const routes = router.getRoutes();
    const routeNames = routes.map(r => r.name);
    
    expect(routeNames).toContain('Home');
    expect(routeNames).toContain('About');
  });

  it('navigates to home route', async () => {
    router.push('/');
    await router.isReady();
    
    expect(router.currentRoute.value.path).toBe('/');
    expect(router.currentRoute.value.name).toBe('Home');
  });

  it('navigates to about route', async () => {
    router.push('/about');
    await router.isReady();
    
    expect(router.currentRoute.value.path).toBe('/about');
    expect(router.currentRoute.value.name).toBe('About');
  });

  it('has lazy-loaded components', () => {
    const routes = router.getRoutes();
    const homeRoute = routes.find(r => r.name === 'Home');
    
    // Lazy-loaded routes have components as functions
    expect(typeof homeRoute?.components?.default).toBe('function');
  });
});
