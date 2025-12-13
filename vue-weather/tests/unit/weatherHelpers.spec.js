import {
  convertTemperature,
  getTemperatureUnit,
  getWindDirection,
  getWeatherCategory,
  isDayTime,
} from '@/utils/weatherHelpers';

describe('weatherHelpers', () => {
  describe('convertTemperature', () => {
    it('converts Celsius to Fahrenheit', () => {
      expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
      expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
    });

    it('converts Fahrenheit to Celsius', () => {
      expect(Math.round(convertTemperature(32, 'fahrenheit', 'celsius'))).toBe(0);
      expect(Math.round(convertTemperature(212, 'fahrenheit', 'celsius'))).toBe(100);
    });

    it('returns same value for same units', () => {
      expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
    });
  });

  describe('getTemperatureUnit', () => {
    it('returns correct unit symbols', () => {
      expect(getTemperatureUnit('metric')).toBe('°C');
      expect(getTemperatureUnit('imperial')).toBe('°F');
      expect(getTemperatureUnit('standard')).toBe('K');
    });

    it('returns Celsius as default', () => {
      expect(getTemperatureUnit('unknown')).toBe('°C');
    });
  });

  describe('getWindDirection', () => {
    it('returns correct cardinal directions', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(270)).toBe('W');
    });
  });

  describe('getWeatherCategory', () => {
    it('categorizes weather conditions correctly', () => {
      expect(getWeatherCategory('Clear')).toBe('sunny');
      expect(getWeatherCategory('Clouds')).toBe('cloudy');
      expect(getWeatherCategory('Rain')).toBe('rainy');
      expect(getWeatherCategory('Snow')).toBe('snowy');
      expect(getWeatherCategory('Thunderstorm')).toBe('stormy');
    });
  });

  describe('isDayTime', () => {
    it('determines day/night correctly', () => {
      const sunrise = 1000;
      const sunset = 2000;
      
      expect(isDayTime(1500, sunrise, sunset)).toBe(true);
      expect(isDayTime(500, sunrise, sunset)).toBe(false);
      expect(isDayTime(2500, sunrise, sunset)).toBe(false);
    });
  });
});
