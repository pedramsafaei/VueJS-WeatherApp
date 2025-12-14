const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  
  pwa: {
    name: 'Weather Pro',
    themeColor: '#667eea',
    msTileColor: '#667eea',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://api\\.openweathermap\\.org/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'weather-api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: new RegExp('^https://openweathermap\\.org/img/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'weather-icons-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 86400,
            },
          },
        },
      ],
    },
    
    manifestOptions: {
      name: 'Weather Pro - Professional Weather Application',
      short_name: 'Weather Pro',
      description: 'Professional weather application with real-time forecasts - Built with Vue 3',
      display: 'standalone',
      background_color: '#667eea',
      theme_color: '#667eea',
      icons: [
        {
          src: './img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: './img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      start_url: '.',
      categories: ['weather', 'utilities', 'lifestyle'],
      shortcuts: [
        {
          name: 'Current Weather',
          short_name: 'Current',
          description: 'View current weather',
          url: '/',
          icons: [{ src: './img/icons/icon-192x192.png', sizes: '192x192' }],
        },
      ],
    },
  },
  
  productionSourceMap: false,
  
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 244000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          primevue: {
            test: /[\\/]node_modules[\\/]primevue[\\/]/,
            name: 'primevue',
            priority: 20,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
    resolve: {
      alias: {
        vue: '@vue/runtime-dom',
      },
    },
  },
  
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },
  
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0] = {
        ...args[0],
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      };
      return args;
    });
  },
});
