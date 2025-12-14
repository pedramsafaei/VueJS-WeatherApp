import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

/**
 * Performance monitoring utility using Web Vitals
 */

interface PerformanceMetrics {
  CLS?: number;
  FID?: number;
  FCP?: number;
  LCP?: number;
  TTFB?: number;
}

const metrics: PerformanceMetrics = {};

// Report metric to console or analytics service
function reportMetric(metric: Metric) {
  metrics[metric.name as keyof PerformanceMetrics] = metric.value;
  
  // Only log in development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`[Performance] ${metric.name}:`, metric.value, metric.rating);
  }
  
  // In production, you would send this to an analytics service
  // Example: analytics.track('web-vitals', { name: metric.name, value: metric.value });
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  try {
    // Cumulative Layout Shift
    onCLS(reportMetric);
    
    // First Input Delay
    onFID(reportMetric);
    
    // First Contentful Paint
    onFCP(reportMetric);
    
    // Largest Contentful Paint
    onLCP(reportMetric);
    
    // Time to First Byte
    onTTFB(reportMetric);
  } catch (error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('Performance monitoring not supported:', error);
    }
  }
}

// Get current metrics
export function getPerformanceMetrics(): PerformanceMetrics {
  return { ...metrics };
}

// Log navigation timing
export function logNavigationTiming() {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[Performance] Navigation Timing:', {
      pageLoadTime: `${pageLoadTime}ms`,
      connectTime: `${connectTime}ms`,
      renderTime: `${renderTime}ms`,
    });
  }

  return {
    pageLoadTime,
    connectTime,
    renderTime,
  };
}

// Monitor component performance
export function measureComponentPerformance(componentName: string, callback: () => void) {
  const start = performance.now();
  
  try {
    callback();
  } finally {
    const duration = performance.now() - start;
    
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
    }
  }
}

// Create a performance observer for specific metrics
export function observePerformance(entryTypes: string[]) {
  if (typeof window === 'undefined' || !window.PerformanceObserver) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(`[Performance] ${entry.entryType}:`, entry.name, entry.duration);
        }
      }
    });

    observer.observe({ entryTypes });
  } catch (error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('PerformanceObserver not supported:', error);
    }
  }
}

// Get memory usage (if available)
export function getMemoryUsage() {
  if (typeof window === 'undefined' || !(performance as any).memory) {
    return null;
  }

  const memory = (performance as any).memory;
  return {
    usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
    totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
    jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
  };
}
