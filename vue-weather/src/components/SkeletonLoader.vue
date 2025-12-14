<template>
  <div class="skeleton-loader mx-auto max-w-4xl px-4">
    <!-- Current Weather Skeleton -->
    <div class="glass-panel p-8 mb-6 animate-pulse">
      <!-- Location -->
      <div class="text-center mb-6">
        <div class="h-10 bg-white/20 rounded-lg w-48 mx-auto mb-2"></div>
        <div class="h-6 bg-white/20 rounded-lg w-32 mx-auto"></div>
      </div>

      <!-- Main Weather -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-40 h-40 bg-white/20 rounded-full mb-4"></div>
        <div class="h-20 bg-white/20 rounded-lg w-32 mb-4"></div>
        <div class="h-8 bg-white/20 rounded-lg w-40"></div>
      </div>

      <!-- Weather Details Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="glass-panel-dark p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/20 rounded-full"></div>
            <div class="flex-1">
              <div class="h-3 bg-white/20 rounded mb-2"></div>
              <div class="h-5 bg-white/20 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Forecast Skeleton -->
    <div class="glass-panel p-6">
      <div class="h-8 bg-white/20 rounded-lg w-48 mb-6"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="i in 5" :key="i" class="glass-panel-dark p-4 rounded-xl">
          <div class="h-6 bg-white/20 rounded mb-3"></div>
          <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3"></div>
          <div class="h-8 bg-white/20 rounded mb-2"></div>
          <div class="h-4 bg-white/20 rounded w-16 mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SkeletonLoader Component
 * Displays loading skeleton for better perceived performance
 */
</script>

<style scoped>
.skeleton-loader {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
