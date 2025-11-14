<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <SharedUiErrorBoundary>
    <AppLayoutDefault>
      <NuxtPage>
        <template #default="{ Component, route }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </template>
      </NuxtPage>
    </AppLayoutDefault>

    <!-- Центральный индикатор загрузки при переходах -->
    <div
      v-if="isNavigating"
      class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"
        ></div>
        <p class="text-gray-600">Загрузка...</p>
      </div>
    </div>
  </SharedUiErrorBoundary>
</template>

<script setup lang="ts">
import SharedUiErrorBoundary from '@/shared/components/ErrorBoundary.vue';
import AppLayoutDefault from '@/app/layout/DefaultLayout.vue';

const isNavigating = ref(false);
const router = useRouter();
const nuxtApp = useNuxtApp();

// Отслеживаем навигацию
router.beforeEach(() => {
  isNavigating.value = true;
});

// Скрываем индикатор после завершения всех загрузок (включая NuxtLoadingIndicator)
// Используем хук page:finish, который срабатывает после полной загрузки страницы
nuxtApp.hook('page:finish', () => {
  // Ждем завершения анимации Transition (300ms) перед скрытием
  setTimeout(() => {
    isNavigating.value = false;
  }, 300);
});
</script>
