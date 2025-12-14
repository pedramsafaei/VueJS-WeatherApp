<template>
  <div class="search-bar-container mx-auto max-w-2xl px-4 my-6">
    <div class="p-input-icon-left w-full">
      <i class="pi pi-search text-white" />
      <InputText
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full glass-panel border-white/30 text-white placeholder-white/60 pl-10 pr-24"
        @keypress.enter="onSearch"
        @input="onInput"
      />
      <Button
        v-if="searchQuery"
        icon="pi pi-times"
        text
        rounded
        severity="secondary"
        class="absolute right-14 top-1/2 -translate-y-1/2 text-white"
        @click="clearSearch"
      />
      <Button
        v-if="enableGeolocation"
        icon="pi pi-map-marker"
        text
        rounded
        severity="secondary"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-white"
        @click="onUseLocation"
        title="Use current location"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SearchBar Component
 * Provides search functionality with geolocation
 */
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

interface Props {
  placeholder?: string;
  enableGeolocation?: boolean;
  enableAutocomplete?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search for a city...',
  enableGeolocation: true,
  enableAutocomplete: true,
});

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'use-location'): void;
}>();

const searchQuery = ref('');

const onInput = () => {
  // Future: implement autocomplete if needed
};

const onSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim());
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const onUseLocation = () => {
  emit('use-location');
};
</script>

<style scoped>
.search-bar-container :deep(.p-inputtext) {
  @apply py-4 px-6 rounded-full text-lg;
}

.search-bar-container :deep(.p-inputtext:focus) {
  @apply ring-2 ring-white/50;
}
</style>

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
