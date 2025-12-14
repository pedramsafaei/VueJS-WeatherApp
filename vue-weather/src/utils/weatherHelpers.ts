/**
 * Weather Helper Utilities
 */

/**
 * Convert temperature between units
 */
export const convertTemperature = (temp: number, from: string, to: string): number => {
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
 */
export const getTemperatureUnit = (units: string): string => {
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
 */
export const getWindSpeedUnit = (units: string): string => {
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
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Get weather icon class based on condition code
 */
export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
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
 * Get weather category from condition
 */
export const getWeatherCategory = (condition: string): string => {
  const categories: Record<string, string> = {
    Clear: 'sunny',
    Clouds: 'cloudy',
    Rain: 'rainy',
    Drizzle: 'rainy',
    Thunderstorm: 'stormy',
    Snow: 'snowy',
    Mist: 'foggy',
    Fog: 'foggy',
    Haze: 'foggy',
    Smoke: 'foggy',
    Dust: 'foggy',
  };
  return categories[condition] || 'default';
};

/**
 * Get weather theme for background
 */
export const getWeatherTheme = (condition: string, isDay: boolean): string => {
  const category = getWeatherCategory(condition);
  return `${category}-${isDay ? 'day' : 'night'}`;
};

/**
 * Check if it's daytime
 */
export const isDayTime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime <= sunset;
};

/**
 * Get UV index level and color
 */
export const getUVIndexLevel = (uvIndex: number): { level: string; color: string } => {
  if (uvIndex <= 2) return { level: 'Low', color: 'green' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'yellow' };
  if (uvIndex <= 7) return { level: 'High', color: 'orange' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'red' };
  return { level: 'Extreme', color: 'purple' };
};

/**
 * Get air quality index description
 */
export const getAQIDescription = (aqi: number): { text: string; color: string } => {
  const descriptions: Record<number, { text: string; color: string }> = {
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
 */
export const formatVisibility = (visibility: number, units: string = 'metric'): string => {
  if (units === 'imperial') {
    const miles = (visibility / 1609.34).toFixed(1);
    return `${miles} mi`;
  }
  const km = (visibility / 1000).toFixed(1);
  return `${km} km`;
};

/**
 * Group forecast data by day
 */
export const groupForecastByDay = (list: any[]): Record<string, any[]> => {
  const grouped: Record<string, any[]> = {};

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
 */
export const getDailySummary = (hourlyData: any[]): any | null => {
  if (!hourlyData || hourlyData.length === 0) return null;

  const temps = hourlyData.map(h => h.main.temp);
  const conditions = hourlyData.map(h => h.weather[0].main);

  return {
    tempMin: Math.min(...temps),
    tempMax: Math.max(...temps),
    condition: conditions[Math.floor(conditions.length / 2)],
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
