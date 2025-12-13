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
              maxAgeSeconds: 300, // 5 minutes
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
              maxAgeSeconds: 86400, // 24 hours
            },
          },
        },
      ],
    },
    
    manifestOptions: {
      name: 'Weather Pro - Professional Weather Application',
      short_name: 'Weather Pro',
      description: 'Professional weather application with real-time forecasts',
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
      ],
    },
  },
  
  // Production source maps (disable for smaller builds)
  productionSourceMap: false,
  
  // Configure webpack
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
  
  // Dev server configuration
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },
});
