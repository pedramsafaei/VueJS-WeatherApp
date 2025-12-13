<template>
  <div v-if="weather" class="current-weather">
    <div class="location-info">
      <h1 class="location-name">
        {{ weather.name }}<span v-if="weather.sys">, {{ weather.sys.country }}</span>
      </h1>
      <p class="date">{{ formattedDate }}</p>
      <button
        v-if="!isFavorite"
        class="favorite-button"
        aria-label="Add to favorites"
        @click="toggleFavorite"
      >
        ☆ Add to Favorites
      </button>
      <button
        v-else
        class="favorite-button active"
        aria-label="Remove from favorites"
        @click="toggleFavorite"
      >
        ★ Remove from Favorites
      </button>
    </div>

    <div class="main-weather">
      <div class="weather-icon">
        <img
          :src="getWeatherIconUrl(weather.weather[0].icon)"
          :alt="weather.weather[0].description"
        />
      </div>
      <div class="temperature">
        <span class="temp-value">{{ Math.round(weather.main.temp) }}</span>
        <span class="temp-unit">{{ temperatureUnit }}</span>
      </div>
      <div class="weather-description">
        <p class="main-description">{{ weather.weather[0].main }}</p>
        <p class="sub-description">{{ weather.weather[0].description }}</p>
      </div>
    </div>

    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-icon">🌡️</span>
        <div class="detail-content">
          <span class="detail-label">Feels Like</span>
          <span class="detail-value"
            >{{ Math.round(weather.main.feels_like) }}{{ temperatureUnit }}</span
          >
        </div>
      </div>
      <div class="detail-item">
        <span class="detail-icon">💧</span>
        <div class="detail-content">
          <span class="detail-label">Humidity</span>
          <span class="detail-value">{{ weather.main.humidity }}%</span>
        </div>
      </div>
      <div class="detail-item">
        <span class="detail-icon">💨</span>
        <div class="detail-content">
          <span class="detail-label">Wind Speed</span>
          <span class="detail-value">{{ weather.wind.speed }} {{ windSpeedUnit }}</span>
        </div>
      </div>
      <div class="detail-item">
        <span class="detail-icon">🧭</span>
        <div class="detail-content">
          <span class="detail-label">Wind Direction</span>
          <span class="detail-value">{{ getWindDirection(weather.wind.deg) }}</span>
        </div>
      </div>
      <div class="detail-item">
        <span class="detail-icon">🔽</span>
        <div class="detail-content">
          <span class="detail-label">Pressure</span>
          <span class="detail-value">{{ weather.main.pressure }} hPa</span>
        </div>
      </div>
      <div v-if="weather.visibility" class="detail-item">
        <span class="detail-icon">👁️</span>
        <div class="detail-content">
          <span class="detail-label">Visibility</span>
          <span class="detail-value">{{ formatVisibility(weather.visibility) }}</span>
        </div>
      </div>
      <div v-if="weather.sys" class="detail-item">
        <span class="detail-icon">🌅</span>
        <div class="detail-content">
          <span class="detail-label">Sunrise</span>
          <span class="detail-value">{{ formatTimestamp(weather.sys.sunrise) }}</span>
        </div>
      </div>
      <div v-if="weather.sys" class="detail-item">
        <span class="detail-icon">🌇</span>
        <div class="detail-content">
          <span class="detail-label">Sunset</span>
          <span class="detail-value">{{ formatTimestamp(weather.sys.sunset) }}</span>
        </div>
      </div>
    </div>

    <div v-if="lastUpdated" class="last-updated">
      Last updated: {{ getRelativeTime(lastUpdated) }}
    </div>
  </div>
</template>

<script>
/**
 * CurrentWeather Component
 * Displays current weather conditions with detailed metrics
 */
import { mapGetters, mapActions } from 'vuex';
import {
  getWindDirection,
  getWindSpeedUnit,
  getTemperatureUnit,
  formatVisibility,
} from '@/utils/weatherHelpers';
import { formatTimestamp, getRelativeTime, formatDate } from '@/utils/dateFormatter';

export default {
  name: 'CurrentWeather',
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('settings', ['units']),
    ...mapGetters('favorites', ['isFavorite']),
    ...mapGetters('weather', ['lastUpdated']),
    temperatureUnit() {
      return getTemperatureUnit(this.units);
    },
    windSpeedUnit() {
      return getWindSpeedUnit(this.units);
    },
    formattedDate() {
      return formatDate(new Date());
    },
  },
  methods: {
    ...mapActions('favorites', ['addFavorite', 'removeFavorite']),
    getWindDirection,
    formatVisibility,
    formatTimestamp,
    getRelativeTime,
    getWeatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    },
    toggleFavorite() {
      if (this.isFavorite(this.weather.name)) {
        this.removeFavorite(this.weather.name);
      } else {
        this.addFavorite({
          name: this.weather.name,
          country: this.weather.sys?.country || '',
          lat: this.weather.coord.lat,
          lon: this.weather.coord.lon,
        });
      }
    },
  },
};
</script>

<style scoped>
.current-weather {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px;
  color: white;
  margin: 24px auto;
  max-width: 800px;
}

.location-info {
  text-align: center;
  margin-bottom: 24px;
}

.location-name {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.date {
  font-size: 18px;
  opacity: 0.9;
  margin: 0 0 16px 0;
}

.favorite-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.favorite-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.favorite-button.active {
  background: rgba(255, 215, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.8);
}

.main-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.weather-icon img {
  width: 150px;
  height: 150px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.temperature {
  font-size: 72px;
  font-weight: 900;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
}

.temp-unit {
  font-size: 36px;
  margin-top: 8px;
}

.weather-description {
  text-align: center;
}

.main-description {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-transform: capitalize;
}

.sub-description {
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 32px;
}

.detail-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.detail-icon {
  font-size: 28px;
  margin-right: 12px;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 18px;
  font-weight: 600;
  margin-top: 4px;
}

.last-updated {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  opacity: 0.7;
  font-style: italic;
}

@media (max-width: 768px) {
  .current-weather {
    padding: 24px 16px;
  }

  .location-name {
    font-size: 28px;
  }

  .temperature {
    font-size: 56px;
  }

  .temp-unit {
    font-size: 28px;
  }

  .main-description {
    font-size: 24px;
  }

  .weather-details {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .detail-item {
    padding: 12px;
  }
}
</style>
