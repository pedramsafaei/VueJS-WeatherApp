import { register } from 'register-service-worker';

const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';

if (isProduction) {
  register(`${import.meta.env.BASE_URL || process.env.BASE_URL || '/'}service-worker.js`, {
    ready() {
      // Service worker is active
    },
    registered() {
      // Service worker has been registered
    },
    cached() {
      // Content has been cached for offline use
    },
    updatefound() {
      // New content is downloading
    },
    updated(registration) {
      // New content is available, notify user to refresh
      if (registration && registration.waiting) {
        const event = new CustomEvent('sw-updated', { detail: registration });
        document.dispatchEvent(event);
      }
    },
    offline() {
      // Running in offline mode
    },
    error(error) {
      // Only log in development mode
      if (!isProduction) {
        // eslint-disable-next-line no-console
        console.error('Error during service worker registration:', error);
      }
    },
  });
}
