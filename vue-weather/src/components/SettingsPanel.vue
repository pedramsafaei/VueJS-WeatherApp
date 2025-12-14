<template>
  <Sidebar v-model:visible="isOpenLocal" position="right" class="w-full md:w-96">
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-cog text-2xl"></i>
        <h3 class="text-xl font-bold">Settings</h3>
      </div>
    </template>

    <div class="settings-content space-y-6">
      <!-- Temperature Unit -->
      <div class="setting-group">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
          Temperature Unit
        </label>
        <div class="flex flex-col gap-2">
          <Button
            label="Celsius (°C)"
            :class="{ 'p-button-primary': units === 'metric', 'p-button-outlined': units !== 'metric' }"
            @click="changeUnits('metric')"
            class="justify-start"
          />
          <Button
            label="Fahrenheit (°F)"
            :class="{ 'p-button-primary': units === 'imperial', 'p-button-outlined': units !== 'imperial' }"
            @click="changeUnits('imperial')"
            class="justify-start"
          />
          <Button
            label="Kelvin (K)"
            :class="{ 'p-button-primary': units === 'standard', 'p-button-outlined': units !== 'standard' }"
            @click="changeUnits('standard')"
            class="justify-start"
          />
        </div>
      </div>

      <Divider />

      <!-- Enable Geolocation -->
      <div class="setting-group">
        <div class="flex items-center justify-between">
          <label for="geolocation-toggle" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Enable Geolocation
          </label>
          <InputSwitch
            id="geolocation-toggle"
            v-model="enableGeolocationLocal"
            @change="toggleGeolocation"
          />
        </div>
      </div>

      <!-- Auto-refresh -->
      <div class="setting-group">
        <div class="flex items-center justify-between">
          <label for="auto-refresh-toggle" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Auto-refresh Weather
          </label>
          <InputSwitch
            id="auto-refresh-toggle"
            v-model="autoRefreshLocal"
            @change="toggleAutoRefresh"
          />
        </div>
      </div>

      <Divider />

      <!-- About Section -->
      <div class="setting-group">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">About</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Weather Pro v3.0.0
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Built with Vue 3, TypeScript, and PrimeVue
        </p>
      </div>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
/**
 * SettingsPanel Component
 * User preferences and settings management
 */
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import Divider from 'primevue/divider';
import { useSettingsStore } from '@/stores/settings';

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'units-changed'): void;
}>();

const settingsStore = useSettingsStore();
const { units, enableGeolocation, autoRefresh } = storeToRefs(settingsStore);

const isOpenLocal = ref(props.isOpen);
const enableGeolocationLocal = ref(enableGeolocation.value);
const autoRefreshLocal = ref(autoRefresh.value);

watch(() => props.isOpen, (newValue) => {
  isOpenLocal.value = newValue;
});

watch(isOpenLocal, (newValue) => {
  if (!newValue) {
    emit('close');
  }
});

watch(enableGeolocation, (newValue) => {
  enableGeolocationLocal.value = newValue;
});

watch(autoRefresh, (newValue) => {
  autoRefreshLocal.value = newValue;
});

const changeUnits = (newUnits: 'metric' | 'imperial' | 'standard') => {
  settingsStore.setUnits(newUnits);
  emit('units-changed');
};

const toggleGeolocation = () => {
  settingsStore.setGeolocation(enableGeolocationLocal.value);
};

const toggleAutoRefresh = () => {
  settingsStore.setAutoRefresh(autoRefreshLocal.value);
};
</script>

<style scoped>
.settings-content {
  @apply p-4;
}

.setting-group {
  @apply mb-6;
}
</style>
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
