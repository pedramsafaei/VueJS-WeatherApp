# API Documentation

## Weather Service API

### Overview

The Weather Service provides a clean interface to interact with the OpenWeatherMap API. All functions handle errors gracefully and return user-friendly error messages.

### Import

```javascript
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
  searchCities,
  clearCache,
  getAirPollution,
} from '@/services/weatherService';
```

---

## Functions

### getCurrentWeatherByCity

Fetch current weather data for a city by name.

**Signature:**
```javascript
getCurrentWeatherByCity(city: string, units: string = 'metric'): Promise<Object>
```

**Parameters:**
- `city` (string, required) - City name (e.g., "London", "New York")
- `units` (string, optional) - Temperature units: 'metric', 'imperial', or 'standard' (default: 'metric')

**Returns:**
Promise that resolves to weather data object

**Example:**
```javascript
try {
  const weather = await getCurrentWeatherByCity('London', 'metric');
  console.log(weather.main.temp); // Temperature
  console.log(weather.weather[0].description); // Weather description
} catch (error) {
  console.error(error.message); // User-friendly error
}
```

**Response Structure:**
```javascript
{
  coord: { lon: number, lat: number },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number
  },
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  },
  name: string
}
```

**Errors:**
- "Please enter a valid city name." - Empty or invalid input
- "Location not found. Please check the city name and try again." - 404 from API
- "Network error. Please check your internet connection." - No network

---

### getCurrentWeatherByCoords

Fetch current weather data by geographic coordinates.

**Signature:**
```javascript
getCurrentWeatherByCoords(lat: number, lon: number, units: string = 'metric'): Promise<Object>
```

**Parameters:**
- `lat` (number, required) - Latitude
- `lon` (number, required) - Longitude
- `units` (string, optional) - Temperature units

**Returns:**
Promise that resolves to weather data object (same structure as getCurrentWeatherByCity)

**Example:**
```javascript
const weather = await getCurrentWeatherByCoords(51.5074, -0.1278, 'metric');
```

---

### getForecastByCity

Fetch 5-day weather forecast for a city by name.

**Signature:**
```javascript
getForecastByCity(city: string, units: string = 'metric'): Promise<Object>
```

**Parameters:**
- `city` (string, required) - City name
- `units` (string, optional) - Temperature units

**Returns:**
Promise that resolves to forecast data object

**Example:**
```javascript
const forecast = await getForecastByCity('Paris', 'metric');
forecast.list.forEach(item => {
  console.log(item.dt_txt, item.main.temp);
});
```

**Response Structure:**
```javascript
{
  list: [
    {
      dt: number, // Unix timestamp
      dt_txt: string, // Date/time text
      main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
      },
      weather: [
        {
          id: number,
          main: string,
          description: string,
          icon: string
        }
      ],
      wind: {
        speed: number,
        deg: number
      }
    }
    // ... more entries (40 total, 3-hour intervals)
  ],
  city: {
    name: string,
    coord: { lat: number, lon: number },
    country: string,
    sunrise: number,
    sunset: number
  }
}
```

---

### getForecastByCoords

Fetch 5-day weather forecast by geographic coordinates.

**Signature:**
```javascript
getForecastByCoords(lat: number, lon: number, units: string = 'metric'): Promise<Object>
```

**Parameters:**
- `lat` (number, required) - Latitude
- `lon` (number, required) - Longitude
- `units` (string, optional) - Temperature units

**Returns:**
Promise that resolves to forecast data object (same structure as getForecastByCity)

**Example:**
```javascript
const forecast = await getForecastByCoords(48.8566, 2.3522, 'imperial');
```

---

### searchCities

Search for cities (for autocomplete functionality).

**Signature:**
```javascript
searchCities(query: string): Promise<Array>
```

**Parameters:**
- `query` (string, required) - Search query (minimum 2 characters)

**Returns:**
Promise that resolves to array of city objects

**Example:**
```javascript
const cities = await searchCities('Lon');
// Returns: [{ name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 }]
```

**Note:** This is a simplified implementation. For production, consider using a dedicated geocoding service.

---

### clearCache

Clear the in-memory cache.

**Signature:**
```javascript
clearCache(): void
```

**Example:**
```javascript
clearCache();
// All cached weather data is removed
```

---

### getAirPollution

Fetch air pollution data for coordinates (non-critical feature).

**Signature:**
```javascript
getAirPollution(lat: number, lon: number): Promise<Object|null>
```

**Parameters:**
- `lat` (number, required) - Latitude
- `lon` (number, required) - Longitude

**Returns:**
Promise that resolves to air pollution data or null if unavailable

**Example:**
```javascript
const pollution = await getAirPollution(51.5074, -0.1278);
if (pollution) {
  console.log(pollution.list[0].main.aqi); // Air Quality Index (1-5)
}
```

---

## Geolocation Service API

### Import

```javascript
import {
  getCurrentPosition,
  isGeolocationSupported,
} from '@/services/geolocationService';
```

### getCurrentPosition

Get the user's current geographic position.

**Signature:**
```javascript
getCurrentPosition(): Promise<Object>
```

**Returns:**
Promise that resolves to position object

**Example:**
```javascript
try {
  const position = await getCurrentPosition();
  console.log(position.lat, position.lon);
  console.log(position.accuracy); // Accuracy in meters
} catch (error) {
  console.error(error.message);
}
```

**Response Structure:**
```javascript
{
  lat: number,      // Latitude
  lon: number,      // Longitude
  accuracy: number  // Accuracy in meters
}
```

**Errors:**
- "Geolocation is not supported by your browser."
- "Location permission denied. Please enable location access in your browser."
- "Location information is unavailable."
- "Location request timed out."

---

### isGeolocationSupported

Check if geolocation is supported by the browser.

**Signature:**
```javascript
isGeolocationSupported(): boolean
```

**Returns:**
Boolean indicating geolocation support

**Example:**
```javascript
if (isGeolocationSupported()) {
  // Show location button
}
```

---

## Vuex Store API

### Weather Module

**Namespace:** `weather`

#### State

Access via getters:

```javascript
import { mapGetters } from 'vuex';

computed: {
  ...mapGetters('weather', [
    'currentWeather',
    'forecast',
    'weatherAlerts',
    'isLoading',
    'error',
    'lastUpdated',
    'hasWeatherData'
  ])
}
```

#### Actions

Dispatch actions:

```javascript
import { mapActions } from 'vuex';

methods: {
  ...mapActions('weather', [
    'setCurrentWeather',
    'setForecast',
    'setWeatherAlerts',
    'setLoading',
    'setError',
    'clearError',
    'clearWeatherData'
  ])
}

// Usage
this.setCurrentWeather(weatherData);
this.setLoading(true);
this.setError('Error message');
```

---

### Favorites Module

**Namespace:** `favorites`

#### State

```javascript
computed: {
  ...mapGetters('favorites', [
    'favorites',        // Array of favorite locations
    'isFavorite',       // Function to check if location is favorite
    'favoritesCount'    // Number of favorites
  ])
}
```

#### Actions

```javascript
methods: {
  ...mapActions('favorites', [
    'addFavorite',
    'removeFavorite',
    'clearFavorites',
    'reorderFavorites'
  ])
}

// Add a favorite
this.addFavorite({
  name: 'London',
  country: 'GB',
  lat: 51.5074,
  lon: -0.1278
});

// Remove a favorite
this.removeFavorite('London');

// Check if favorite
this.isFavorite('London'); // returns true/false
```

---

### Settings Module

**Namespace:** `settings`

#### State

```javascript
computed: {
  ...mapGetters('settings', [
    'units',              // 'metric' | 'imperial' | 'standard'
    'darkMode',           // boolean
    'language',           // string
    'enableGeolocation',  // boolean
    'enableNotifications',// boolean
    'autoRefresh',        // boolean
    'refreshInterval',    // number (milliseconds)
    'allSettings'         // object with all settings
  ])
}
```

#### Actions

```javascript
methods: {
  ...mapActions('settings', [
    'setUnits',
    'toggleDarkMode',
    'setDarkMode',
    'setLanguage',
    'setGeolocation',
    'setNotifications',
    'setAutoRefresh',
    'setRefreshInterval',
    'resetSettings'
  ])
}

// Change temperature units
this.setUnits('imperial');

// Toggle dark mode
this.toggleDarkMode();

// Set auto-refresh
this.setAutoRefresh(true);
this.setRefreshInterval(600000); // 10 minutes
```

---

## Utility Functions

### Date Formatter

```javascript
import {
  formatDate,
  formatShortDate,
  formatTime,
  formatTimestamp,
  getDayName,
  getShortDayName,
  isToday,
  getRelativeTime,
} from '@/utils/dateFormatter';

// Examples
formatDate(new Date());              // "Saturday, December 13, 2025"
formatShortDate(new Date());         // "Dec 13"
formatTime(new Date());              // "10:30 AM"
formatTimestamp(1702468800);         // "10:30 AM"
getDayName(new Date());              // "Saturday"
getShortDayName(new Date());         // "Sat"
isToday(new Date());                 // true
getRelativeTime(Date.now() - 3600000); // "1 hour ago"
```

---

### Weather Helpers

```javascript
import {
  convertTemperature,
  getTemperatureUnit,
  getWindSpeedUnit,
  getWindDirection,
  getWeatherIcon,
  getWeatherCategory,
  getWeatherTheme,
  isDayTime,
  getUVIndexLevel,
  getAQIDescription,
  formatVisibility,
  groupForecastByDay,
  getDailySummary,
} from '@/utils/weatherHelpers';

// Examples
convertTemperature(25, 'celsius', 'fahrenheit'); // 77
getTemperatureUnit('metric');                    // "°C"
getWindSpeedUnit('imperial');                    // "mph"
getWindDirection(180);                           // "S"
getWeatherIcon('01d');                          // "sun"
getWeatherCategory('Rain');                     // "rainy"
getWeatherTheme('Clear', true);                 // "sunny-day"
isDayTime(currentTime, sunrise, sunset);        // true/false
formatVisibility(10000, 'metric');              // "10.0 km"
```

---

## Error Handling

All service functions throw errors with user-friendly messages:

```javascript
try {
  const weather = await getCurrentWeatherByCity('InvalidCity');
} catch (error) {
  // error.message contains user-friendly text like:
  // "Location not found. Please check the city name and try again."
  displayError(error.message);
}
```

### Common Error Messages

- **404**: "Location not found. Please check the city name and try again."
- **401**: "Invalid API key. Please check your configuration."
- **429**: "Too many requests. Please try again later."
- **5xx**: "Weather service is temporarily unavailable. Please try again later."
- **Network**: "Network error. Please check your internet connection."
- **Invalid Input**: "Please enter a valid city name."

---

## Caching

The weather service implements automatic caching:

- **Duration**: 5 minutes (configurable via VUE_APP_CACHE_DURATION)
- **Storage**: In-memory (resets on page refresh)
- **Key Format**: `{endpoint}_{location}_{units}`

**Manual cache control:**
```javascript
import { clearCache } from '@/services/weatherService';

// Clear all cached data
clearCache();
```

---

## Rate Limiting

OpenWeatherMap free tier limits:
- **60 calls/minute**
- **1,000,000 calls/month**

The service implements caching to reduce API calls. For production use with high traffic, consider:
- Upgrading to paid API tier
- Implementing server-side proxy with additional caching
- Using Redis or similar for distributed caching

---

## Best Practices

1. **Always handle errors**
   ```javascript
   try {
     const weather = await getCurrentWeatherByCity(city);
   } catch (error) {
     showErrorMessage(error.message);
   }
   ```

2. **Use appropriate units**
   ```javascript
   const units = this.$store.getters['settings/units'];
   const weather = await getCurrentWeatherByCity(city, units);
   ```

3. **Cache when possible**
   - Service automatically caches
   - Don't clear cache unnecessarily

4. **Validate user input**
   ```javascript
   if (!city || city.trim().length < 2) {
     return; // Don't make API call
   }
   ```

5. **Use TypeScript or JSDoc for type safety**
   ```javascript
   /**
    * @param {string} city
    * @param {string} units
    * @returns {Promise<WeatherData>}
    */
   async function fetchWeather(city, units) { }
   ```

---

## Support

For API issues:
- Check OpenWeatherMap [documentation](https://openweathermap.org/api)
- Verify API key is valid
- Check rate limits
- Review error messages

For implementation help:
- See [CONTRIBUTING.md](../CONTRIBUTING.md)
- Open an issue on GitHub
- Check existing issues and discussions
