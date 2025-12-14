<template>
  <Transition name="slide-up">
    <div v-if="showPrompt" class="install-prompt glass-panel p-4 fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 text-4xl">📱</div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-white mb-1">Install Weather Pro</h3>
          <p class="text-sm text-white/80 mb-3">
            Install our app for quick access and offline functionality!
          </p>
          <div class="flex gap-2">
            <Button 
              label="Install" 
              icon="pi pi-download"
              size="small"
              @click="handleInstall"
            />
            <Button 
              label="Later" 
              size="small"
              outlined
              @click="handleDismiss"
            />
          </div>
        </div>
        <Button 
          icon="pi pi-times"
          text
          rounded
          size="small"
          @click="handleDismiss"
          class="text-white"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';

const showPrompt = ref(false);
let deferredPrompt: any = null;

const PROMPT_DISMISSED_KEY = 'pwa-prompt-dismissed';
const PROMPT_DISMISSED_TIME_KEY = 'pwa-prompt-dismissed-time';
const DAYS_BEFORE_RESHOWING = 7;

onMounted(() => {
  // Check if prompt was recently dismissed
  const dismissedTime = localStorage.getItem(PROMPT_DISMISSED_TIME_KEY);
  if (dismissedTime) {
    const daysSinceDismissal = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissal < DAYS_BEFORE_RESHOWING) {
      return;
    }
  }

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show the prompt after a delay
    setTimeout(() => {
      showPrompt.value = true;
    }, 3000);
  });

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    showPrompt.value = false;
    deferredPrompt = null;
  });
});

const handleInstall = async () => {
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === 'accepted') {
    // User accepted the install
  }

  deferredPrompt = null;
  showPrompt.value = false;
};

const handleDismiss = () => {
  showPrompt.value = false;
  localStorage.setItem(PROMPT_DISMISSED_KEY, 'true');
  localStorage.setItem(PROMPT_DISMISSED_TIME_KEY, Date.now().toString());
};
</script>

<style scoped>
.install-prompt {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  animation: slideUp 0.5s ease-out;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
