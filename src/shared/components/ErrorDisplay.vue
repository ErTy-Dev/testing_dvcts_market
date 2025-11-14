<template>
  <div class="text-center py-12">
    <div class="max-w-md mx-auto">
      <div class="mb-4">
        <svg
          class="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        {{ title }}
      </h2>
      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>
      <div class="flex gap-4 justify-center">
        <SharedUiButton v-if="showHomeButton" @click="navigateTo('/')" variant="default">
          Вернуться на главную
        </SharedUiButton>
        <SharedUiButton v-if="showRetryButton" @click="$emit('retry')" variant="secondary">
          Попробовать снова
        </SharedUiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SharedUiButton from '@/shared/components/ui/button/Button.vue';

interface Props {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'Произошла ошибка',
  message: 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.',
  showHomeButton: true,
  showRetryButton: false,
});

defineEmits<{
  retry: [];
}>();
</script>
