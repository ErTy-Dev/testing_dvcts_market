<template>
  <div>
    <slot v-if="!error" />
    <SharedUiErrorDisplay
      v-else
      :title="errorTitle"
      :message="errorMessage"
      :show-home-button="showHomeButton"
      :show-retry-button="showRetryButton"
      @retry="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import SharedUiErrorDisplay from '@/shared/components/ErrorDisplay.vue';

interface Props {
  errorTitle?: string;
  errorMessage?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  errorTitle: 'Произошла ошибка',
  errorMessage: 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.',
  showHomeButton: true,
  showRetryButton: false,
});

const error = ref<Error | null>(null);

// Перехватываем ошибки из дочерних компонентов
onErrorCaptured((err) => {
  error.value = err;
  console.error('ErrorBoundary caught error:', err);
  // Возвращаем false, чтобы предотвратить дальнейшее распространение ошибки
  return false;
});

const handleRetry = () => {
  error.value = null;
  // Эмитим событие для перезагрузки данных
  emit('retry');
};

const emit = defineEmits<{
  retry: [];
}>();
</script>
