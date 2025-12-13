<template>
  <div class="settings-panel" :class="{ open: isOpen }">
    <div class="settings-header">
      <h3 class="settings-title">Settings</h3>
      <button class="close-button" aria-label="Close settings" @click="$emit('close')">
        ✕
      </button>
    </div>

    <div class="settings-content">
      <div class="setting-group">
        <label class="setting-label">Temperature Unit</label>
        <div class="unit-selector">
          <button
            class="unit-button"
            :class="{ active: units === 'metric' }"
            @click="changeUnits('metric')"
          >
            Celsius (°C)
          </button>
          <button
            class="unit-button"
            :class="{ active: units === 'imperial' }"
            @click="changeUnits('imperial')"
          >
            Fahrenheit (°F)
          </button>
          <button
            class="unit-button"
            :class="{ active: units === 'standard' }"
            @click="changeUnits('standard')"
          >
            Kelvin (K)
          </button>
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">
          <input
            type="checkbox"
            :checked="darkMode"
            @change="$emit('toggle-dark-mode')"
          />
          <span>Dark Mode</span>
        </label>
      </div>

      <div class="setting-group">
        <label class="setting-label">
          <input
            type="checkbox"
            :checked="enableGeolocation"
            @change="toggleGeolocation"
          />
          <span>Enable Geolocation</span>
        </label>
      </div>

      <div class="setting-group">
        <label class="setting-label">
          <input
            type="checkbox"
            :checked="autoRefresh"
            @change="toggleAutoRefresh"
          />
          <span>Auto-refresh Weather Data</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * SettingsPanel Component
 * User preferences and settings management
 */
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SettingsPanel',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('settings', [
      'units',
      'darkMode',
      'enableGeolocation',
      'autoRefresh',
    ]),
  },
  methods: {
    ...mapActions('settings', [
      'setUnits',
      'setGeolocation',
      'setAutoRefresh',
    ]),
    changeUnits(newUnits) {
      this.setUnits(newUnits);
      this.$emit('units-changed', newUnits);
    },
    toggleGeolocation(event) {
      this.setGeolocation(event.target.checked);
    },
    toggleAutoRefresh(event) {
      this.setAutoRefresh(event.target.checked);
    },
  },
};
</script>

<style scoped>
.settings-panel {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.settings-panel.open {
  right: 0;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.settings-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.settings-content {
  padding: 24px;
}

.setting-group {
  margin-bottom: 32px;
}

.setting-label {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
}

.setting-label input[type='checkbox'] {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.unit-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.unit-button {
  padding: 12px 16px;
  border: 2px solid #ddd;
  background: white;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.unit-button:hover {
  border-color: #999;
  background: #f5f5f5;
}

.unit-button.active {
  border-color: #4a90e2;
  background: #4a90e2;
  color: white;
}

@media (max-width: 768px) {
  .settings-panel {
    max-width: 100%;
  }
}
</style>
