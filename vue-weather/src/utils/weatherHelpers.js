/**
 * Weather Helper Utilities
 */

/**
 * Convert temperature between units
 * @param {number} temp - Temperature value
 * @param {string} from - Source unit (celsius, fahrenheit, kelvin)
 * @param {string} to - Target unit
 * @returns {number} - Converted temperature
 */
export const convertTemperature = (temp, from, to) => {
  if (from === to) return temp;

  let celsius = temp;

  // Convert to Celsius first
  if (from === 'fahrenheit') {
    celsius = ((temp - 32) * 5) / 9;
  } else if (from === 'kelvin') {
    celsius = temp - 273.15;
  }

  // Convert from Celsius to target
  if (to === 'fahrenheit') {
    return (celsius * 9) / 5 + 32;
  } else if (to === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
};

/**
 * Get temperature unit symbol
 * @param {string} units - Unit system (metric, imperial, standard)
 * @returns {string} - Unit symbol
 */
export const getTemperatureUnit = units => {
  switch (units) {
    case 'metric':
      return '°C';
    case 'imperial':
      return '°F';
    case 'standard':
      return 'K';
    default:
      return '°C';
  }
};

/**
 * Get wind speed unit
 * @param {string} units - Unit system
 * @returns {string} - Wind speed unit
 */
export const getWindSpeedUnit = units => {
  switch (units) {
    case 'imperial':
      return 'mph';
    case 'metric':
    default:
      return 'm/s';
  }
};

/**
 * Get wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} - Cardinal direction
 */
export const getWindDirection = degrees => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Get weather icon class based on condition code
 * @param {string} iconCode - OpenWeatherMap icon code
 * @returns {string} - Icon class name
 */
export const getWeatherIcon = iconCode => {
  // Map OpenWeatherMap icon codes to weather-icons or custom classes
  const iconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud-sun',
    '02n': 'cloud-moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'clouds',
    '04n': 'clouds',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'rain-sun',
    '10n': 'rain-moon',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'fog',
    '50n': 'fog',
  };
  return iconMap[iconCode] || 'cloud';
};

/**
 * Get weather condition category
 * @param {string} main - Main weather condition
 * @returns {string} - Category for styling
 */
export const getWeatherCategory = main => {
  const category = main.toLowerCase();
  if (['clear', 'sunny'].includes(category)) return 'sunny';
  if (['clouds', 'cloudy'].includes(category)) return 'cloudy';
  if (['rain', 'drizzle'].includes(category)) return 'rainy';
  if (['thunderstorm'].includes(category)) return 'stormy';
  if (['snow'].includes(category)) return 'snowy';
  if (['mist', 'fog', 'haze'].includes(category)) return 'foggy';
  return 'default';
};

/**
 * Get background theme based on weather
 * @param {string} main - Main weather condition
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - Background theme class
 */
export const getWeatherTheme = (main, isDay = true) => {
  const category = getWeatherCategory(main);
  const timeOfDay = isDay ? 'day' : 'night';
  return `${category}-${timeOfDay}`;
};

/**
 * Check if it's daytime based on current time and sunrise/sunset
 * @param {number} current - Current timestamp
 * @param {number} sunrise - Sunrise timestamp
 * @param {number} sunset - Sunset timestamp
 * @returns {boolean} - True if daytime
 */
export const isDayTime = (current, sunrise, sunset) => {
  return current >= sunrise && current <= sunset;
};

/**
 * Get UV index level description
 * @param {number} uvIndex - UV index value
 * @returns {Object} - Level and description
 */
export const getUVIndexLevel = uvIndex => {
  if (uvIndex <= 2) return { level: 'Low', color: 'green' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'yellow' };
  if (uvIndex <= 7) return { level: 'High', color: 'orange' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'red' };
  return { level: 'Extreme', color: 'purple' };
};

/**
 * Get air quality index description
 * @param {number} aqi - Air quality index (1-5)
 * @returns {Object} - Description and color
 */
export const getAQIDescription = aqi => {
  const descriptions = {
    1: { text: 'Good', color: 'green' },
    2: { text: 'Fair', color: 'yellow' },
    3: { text: 'Moderate', color: 'orange' },
    4: { text: 'Poor', color: 'red' },
    5: { text: 'Very Poor', color: 'purple' },
  };
  return descriptions[aqi] || { text: 'Unknown', color: 'gray' };
};

/**
 * Format visibility
 * @param {number} visibility - Visibility in meters
 * @param {string} units - Unit system
 * @returns {string} - Formatted visibility
 */
export const formatVisibility = (visibility, units = 'metric') => {
  if (units === 'imperial') {
    const miles = (visibility / 1609.34).toFixed(1);
    return `${miles} mi`;
  }
  const km = (visibility / 1000).toFixed(1);
  return `${km} km`;
};

/**
 * Group forecast data by day
 * @param {Array} list - Forecast list from API
 * @returns {Object} - Grouped forecast by day
 */
export const groupForecastByDay = list => {
  const grouped = {};

  list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};

/**
 * Get daily summary from hourly forecast
 * @param {Array} hourlyData - Hourly forecast data for a day
 * @returns {Object} - Daily summary
 */
export const getDailySummary = hourlyData => {
  if (!hourlyData || hourlyData.length === 0) return null;

  const temps = hourlyData.map(h => h.main.temp);
  const conditions = hourlyData.map(h => h.weather[0].main);

  return {
    tempMin: Math.min(...temps),
    tempMax: Math.max(...temps),
    condition: conditions[Math.floor(conditions.length / 2)], // midday condition
    icon: hourlyData[Math.floor(hourlyData.length / 2)].weather[0].icon,
    date: hourlyData[0].dt,
  };
};

export default {
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
};
