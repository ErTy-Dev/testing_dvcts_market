<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 font-bold text-xl group">
          <div class="relative">
            <svg
              class="h-9 w-9 transition-transform group-hover:scale-110"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #3b82f6; stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: #8b5cf6; stop-opacity: 1" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="20" fill="url(#headerGrad)" />
              <path d="M30 30 L50 20 L70 30 L70 50 L50 60 L30 50 Z" fill="white" opacity="0.9" />
              <circle cx="50" cy="40" r="8" fill="url(#headerGrad)" />
              <path
                d="M35 55 L40 65 L50 70 L60 65 L65 55"
                stroke="white"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span
            class="hidden sm:inline-block text-gray-900 group-hover:text-gray-700 transition-colors"
          >
            Marketplace
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            active-class="text-gray-900 bg-gray-100 font-semibold"
          >
            Главная
          </NuxtLink>
          <NuxtLink
            to="/"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            active-class="text-gray-900 bg-gray-100 font-semibold"
          >
            Products
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Search Button (Mobile) -->
          <SharedUiDevelopmentModal>
            <button
              class="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Поиск"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </SharedUiDevelopmentModal>

          <!-- Cart Button -->
          <SharedUiDevelopmentModal>
            <button
              class="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Корзина"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold text-white shadow-sm"
              >
                {{ cartCount > 9 ? '9+' : cartCount }}
              </span>
            </button>
          </SharedUiDevelopmentModal>

          <!-- User Menu (Mobile) -->
          <SharedUiDevelopmentModal>
            <button
              class="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Меню"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </SharedUiDevelopmentModal>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SharedUiDevelopmentModal from '@/shared/components/DevelopmentModal.vue';

const cartCount = ref(0);
</script>
