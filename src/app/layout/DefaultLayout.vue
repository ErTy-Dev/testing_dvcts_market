<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <WidgetsHeader />
    <main class="flex-1">
      <slot />
    </main>
    <WidgetsFooter />
  </div>
</template>

<script setup lang="ts">
import WidgetsHeader from '@/widgets/header/Header.vue';
import WidgetsFooter from '@/widgets/footer/Footer.vue';
</script>
