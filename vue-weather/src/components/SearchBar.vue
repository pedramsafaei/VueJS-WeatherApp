<template>
  <div class="search-bar-container">
    <div class="search-bar" :class="{ focused: isFocused, error: hasError }">
      <i class="icon search-icon">🔍</i>
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        class="search-input"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        @input="onInput"
        @keypress.enter="onSearch"
        @focus="isFocused = true"
        @blur="onBlur"
      />
      <button
        v-if="searchQuery"
        class="clear-button"
        aria-label="Clear search"
        @click="clearSearch"
      >
        ✕
      </button>
      <button
        v-if="enableGeolocation"
        class="location-button"
        aria-label="Use current location"
        title="Use current location"
        @click="onUseLocation"
      >
        📍
      </button>
    </div>
    <transition name="fade">
      <div v-if="showSuggestions && suggestions.length > 0" class="suggestions">
        <button
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="suggestion-item"
          @click="selectSuggestion(suggestion)"
        >
          <span class="suggestion-name">{{ suggestion.name }}</span>
          <span class="suggestion-country">{{ suggestion.country }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * SearchBar Component
 * Provides search functionality with autocomplete and geolocation
 */
import { searchCities } from '@/services/weatherService';

export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Search for a city...',
    },
    ariaLabel: {
      type: String,
      default: 'Search for a city',
    },
    enableGeolocation: {
      type: Boolean,
      default: true,
    },
    enableAutocomplete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      isFocused: false,
      hasError: false,
      suggestions: [],
      showSuggestions: false,
      debounceTimer: null,
    };
  },
  methods: {
    onInput() {
      this.hasError = false;

      if (!this.enableAutocomplete || this.searchQuery.length < 2) {
        this.suggestions = [];
        this.showSuggestions = false;
        return;
      }

      // Debounce autocomplete requests
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestions();
      }, 300);
    },

    async fetchSuggestions() {
      try {
        const results = await searchCities(this.searchQuery);
        this.suggestions = results.slice(0, 5); // Limit to 5 suggestions
        this.showSuggestions = this.suggestions.length > 0;
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        this.suggestions = [];
        this.showSuggestions = false;
      }
    },

    onSearch() {
      if (!this.searchQuery.trim()) {
        this.hasError = true;
        return;
      }
      this.showSuggestions = false;
      this.$emit('search', this.searchQuery.trim());
    },

    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.name;
      this.showSuggestions = false;
      this.$emit('search', suggestion.name);
    },

    clearSearch() {
      this.searchQuery = '';
      this.suggestions = [];
      this.showSuggestions = false;
      this.$refs.searchInput.focus();
      this.$emit('clear');
    },

    onBlur() {
      // Delay to allow suggestion click to register
      setTimeout(() => {
        this.isFocused = false;
        this.showSuggestions = false;
      }, 200);
    },

    onUseLocation() {
      this.$emit('use-location');
    },

    focus() {
      this.$refs.searchInput.focus();
    },
  },
};
</script>

<style scoped>
.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 12px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-bar.focused {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

.search-bar.error {
  border: 2px solid #ff6b6b;
  animation: shake 0.3s ease;
}

.search-icon {
  font-size: 18px;
  margin-right: 12px;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.clear-button,
.location-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  font-size: 16px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  margin-left: 8px;
}

.clear-button:hover,
.location-button:hover {
  opacity: 1;
}

.suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.suggestion-item:hover {
  background: #f5f5f5;
}

.suggestion-name {
  font-weight: 500;
  color: #333;
}

.suggestion-country {
  font-size: 14px;
  color: #999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@media (max-width: 768px) {
  .search-bar {
    padding: 10px 16px;
  }

  .search-input {
    font-size: 14px;
  }
}
</style>
