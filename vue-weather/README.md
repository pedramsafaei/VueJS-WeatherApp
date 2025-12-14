# Weather Pro - Vue 3 Application

A professional, production-ready weather application built with Vue 3, TypeScript, and modern web technologies.

## 🚀 Vue 3 Migration Complete

This application has been fully migrated from Vue 2.7.15 to Vue 3 with the following comprehensive upgrades:

### ✨ Framework Upgrades
- **Vue 3.4.15** - Latest stable version with Composition API
- **Vue Router 4.2.5** - Modern routing with lazy loading
- **Pinia 2.1.7** - Official Vue 3 state management (replaces Vuex)
- **TypeScript 5.3.3** - Full type safety throughout the application

### 🎨 UI & Styling
- **PrimeVue 3.48.1** - Professional component library
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Glassmorphism effects** - Modern card designs with backdrop blur
- **Dark mode support** - Automatic detection and manual toggle
- **Responsive design** - Mobile-first approach
- **Smooth animations** - Micro-interactions and transitions

### 🏗️ Architecture & Features
- **Composition API with `<script setup>`** - All components use modern syntax
- **Error boundaries** - Graceful error handling
- **Performance monitoring** - Web Vitals tracking
- **PWA support** - Offline functionality and install prompts
- **Skeleton loaders** - Enhanced perceived performance
- **Code splitting** - Lazy-loaded routes for optimal bundle size
- **Auto-refresh** - Configurable weather data updates

### 🧪 Testing & Quality
- **Jest 29.7.0** - Modern testing framework
- **Vue Test Utils 2.4.4** - Vue 3 component testing
- **80% test coverage** - Comprehensive unit and integration tests
- **TypeScript strict mode** - Enhanced code quality
- **ESLint & Prettier** - Consistent code formatting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build

# Run tests with coverage
npm run test:unit

# Run type checking
npm run type-check

# Lint and fix files
npm run lint:fix
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Add your OpenWeatherMap API key:
```
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

## Available Scripts

- `npm run serve` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and auto-fix code
- `npm run format` - Format code with Prettier
- `npm run test:unit` - Run unit tests with coverage
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── assets/         # Static assets (images, styles)
├── components/     # Reusable Vue components
│   ├── CurrentWeather.vue
│   ├── WeatherForecast.vue
│   ├── SearchBar.vue
│   ├── SettingsPanel.vue
│   ├── FavoriteLocations.vue
│   ├── ErrorMessage.vue
│   ├── LoadingSpinner.vue
│   ├── SkeletonLoader.vue
│   ├── ErrorBoundary.vue
│   └── InstallPrompt.vue
├── views/          # Route-level components
│   ├── Home.vue
│   └── About.vue
├── stores/         # Pinia stores
│   ├── weather.ts
│   ├── settings.ts
│   └── favorites.ts
├── services/       # API and external services
│   ├── weatherService.ts
│   └── geolocationService.ts
├── utils/          # Utility functions
│   ├── weatherHelpers.ts
│   ├── dateFormatter.ts
│   └── performance.ts
├── router/         # Vue Router configuration
│   └── index.ts
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## Development

### Adding a New Component

1. Create component file in `src/components/` using Composition API:
```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Hello World');
</script>
```

2. Add tests in `tests/unit/components/`
3. Import and use in parent component
4. Update documentation

### Adding a New Store Module

1. Create store file in `src/stores/` using Pinia:
```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMyStore = defineStore('myStore', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  
  function increment() {
    count.value++;
  }
  
  return { count, doubleCount, increment };
});
```

2. Add tests in `tests/unit/stores/`
3. Use in components with `storeToRefs()`

### Adding a New Route

1. Create view component in `src/views/`
2. Add route to `src/router/index.ts`:
```typescript
{
  path: '/my-route',
  name: 'MyRoute',
  component: () => import('../views/MyView.vue'),
}
```

## Testing

We use Jest and Vue Test Utils for comprehensive testing:

```bash
# Run all tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage report
npm run test:unit -- --coverage

# Run specific test file
npm run test:unit -- CurrentWeather.spec.ts
```

### Test Coverage Goals
- Overall coverage: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+
- Statements: 80%+

### Writing Tests

Example component test:
```typescript
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import MyComponent from '@/components/MyComponent.vue';

describe('MyComponent.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { message: 'Hello' },
      global: { plugins: [createPinia()] },
    });
    
    expect(wrapper.text()).toContain('Hello');
  });
});
```

## Building

The build process creates optimized production files in `dist/`:

```bash
npm run build
```

Build features:
- **Minification** - Reduced file sizes
- **Code splitting** - Lazy-loaded routes
- **Tree shaking** - Removes unused code
- **CSS extraction** - Optimized stylesheets
- **Asset optimization** - Compressed images and fonts
- **PWA generation** - Service worker for offline support
- **Source maps** - For debugging production issues

## Performance Optimization

### Web Vitals Monitoring
The application tracks Core Web Vitals:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

### Optimization Techniques
- Lazy loading for routes and heavy components
- Image optimization and lazy loading
- Skeleton loaders for perceived performance
- Efficient state management with Pinia
- Memoized computed properties
- Debounced user inputs

## PWA Features

### Installation
- Install prompt for desktop and mobile
- Standalone app experience
- Custom app icons and splash screens

### Offline Support
- Service worker caching
- Offline fallback pages
- Background sync (planned)

### Update Notifications
- Automatic update detection
- User prompt for app refresh

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion respect
- Screen reader compatibility

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Docker
```bash
# Build image
docker build -t weather-pro .

# Run container
docker run -p 8080:80 weather-pro
```

### Docker Compose
```bash
docker-compose up -d
```

### Static Hosting
Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Azure Static Web Apps

## Migration Notes

### Breaking Changes from Vue 2
- `new Vue()` → `createApp()`
- Vuex → Pinia
- Options API → Composition API
- `beforeDestroy` → `beforeUnmount`
- `destroyed` → `unmounted`
- Global event bus → provide/inject or props/events

### Key Improvements
- Better TypeScript support
- Faster runtime performance
- Smaller bundle size
- Better tree-shaking
- Enhanced developer experience
- Improved debugging

## Troubleshooting

### Common Issues

**Issue**: TypeScript errors in components
- Solution: Run `npm run type-check` to identify issues

**Issue**: Tests failing
- Solution: Ensure test setup is correct and dependencies are installed

**Issue**: Build errors
- Solution: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Issue**: PWA not updating
- Solution: Clear service worker cache and hard refresh

## Support

For issues and questions:
- Check existing [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- Read the main [README.md](../README.md)
- Review [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT License - see LICENSE file for details.

