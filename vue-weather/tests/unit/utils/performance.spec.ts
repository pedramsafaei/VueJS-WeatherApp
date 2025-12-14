import { describe, it, expect, vi } from '@jest/globals';
import {
  initPerformanceMonitoring,
  getPerformanceMetrics,
  measureComponentPerformance,
  getMemoryUsage,
} from '@/utils/performance';

describe('Performance Utils', () => {
  it('initializes performance monitoring without errors', () => {
    expect(() => initPerformanceMonitoring()).not.toThrow();
  });

  it('returns performance metrics object', () => {
    const metrics = getPerformanceMetrics();
    expect(metrics).toBeInstanceOf(Object);
  });

  it('measures component performance', () => {
    const callback = vi.fn();
    measureComponentPerformance('TestComponent', callback);
    expect(callback).toHaveBeenCalled();
  });

  it('handles getMemoryUsage safely', () => {
    const result = getMemoryUsage();
    // Should return null or object depending on browser support
    expect(result === null || typeof result === 'object').toBe(true);
  });
});
