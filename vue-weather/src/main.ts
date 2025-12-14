import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router';
import App from './App.vue';
import './registerServiceWorker';
import './assets/tailwind.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

// Pinia store with persistence
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Global error:', err, info);
  }
  
  // In production, you might want to send this to an error tracking service
  // Example: errorTrackingService.logError(err, { instance, info });
};

app.mount('#app');
