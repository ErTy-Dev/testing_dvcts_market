<template>
  <AppLayoutDefaultLayout>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Error Code -->
        <div class="mb-8">
          <h1
            :class="[
              'text-9xl sm:text-[12rem] font-bold bg-clip-text text-transparent leading-none',
              errorInfo.gradient,
            ]"
          >
            {{ statusCode }}
          </h1>
        </div>

        <!-- Error Icon -->
        <div v-if="errorInfo.icon" class="mb-6 flex justify-center">
          <div :class="['rounded-full p-4', errorInfo.iconBg]">
            <component :is="errorInfo.icon" :class="['h-12 w-12', errorInfo.iconColor]" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
          <h2 :class="['text-3xl sm:text-4xl font-bold mb-4', errorInfo.titleColor]">
            {{ errorInfo.title }}
          </h2>
          <p class="text-lg text-gray-600 mb-2">
            {{ errorInfo.description }}
          </p>
          <p v-if="errorInfo.hint" class="text-sm text-gray-500">
            {{ errorInfo.hint }}
          </p>
        </div>

        <!-- Error Details -->
        <div v-if="errorDetails" class="mb-8">
          <div :class="['rounded-lg p-4 text-left', errorInfo.detailsBg, errorInfo.detailsBorder]">
            <p :class="['text-sm', errorInfo.detailsText]">
              <strong>Детали ошибки:</strong>
              <br />
              {{ errorDetails }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SharedUiButton
            v-if="errorInfo.showHomeButton"
            as="a"
            href="/"
            variant="default"
            size="lg"
            class="w-full sm:w-auto"
          >
            <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Вернуться на главную
          </SharedUiButton>

          <SharedUiButton
            v-if="errorInfo.showBackButton"
            variant="outline"
            size="lg"
            class="w-full sm:w-auto"
            @click="goBack"
          >
            <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад
          </SharedUiButton>

          <SharedUiButton
            v-if="errorInfo.showRetryButton"
            variant="default"
            size="lg"
            class="w-full sm:w-auto"
            @click="retry"
          >
            <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Попробовать снова
          </SharedUiButton>
        </div>

        <!-- Helpful Links -->
        <div v-if="errorInfo.showLinks" class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-500 mb-4">Полезные ссылки:</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Главная страница
            </a>
            <a
              href="/products"
              class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Каталог товаров
            </a>
          </div>
        </div>
      </div>
    </div>
  </AppLayoutDefaultLayout>
</template>

<script setup lang="ts">
import { h } from 'vue';
import AppLayoutDefaultLayout from '@/app/layout/DefaultLayout.vue';
import SharedUiButton from '@/shared/components/ui/button/Button.vue';

interface ErrorProps {
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}

const props = defineProps<ErrorProps>();

const statusCode = computed(() => props.error?.statusCode || 500);

// Иконки для разных типов ошибок
const ErrorIcon = () =>
  h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    }),
  ]);

const LockIcon = () =>
  h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    }),
  ]);

const ServerIcon = () =>
  h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    }),
  ]);

const WifiIcon = () =>
  h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    }),
  ]);

// Информация об ошибках в зависимости от статус-кода
const errorInfo = computed(() => {
  const code = statusCode.value;

  switch (code) {
    case 400:
      return {
        title: 'Неверный запрос',
        description: 'Запрос содержит некорректные данные или параметры.',
        hint: 'Проверьте правильность введенных данных и попробуйте снова.',
        gradient: 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600',
        titleColor: 'text-orange-600',
        icon: ErrorIcon,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        detailsBg: 'bg-orange-50',
        detailsBorder: 'border border-orange-200',
        detailsText: 'text-orange-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: false,
        showLinks: true,
      };

    case 401:
      return {
        title: 'Требуется авторизация',
        description: 'Для доступа к этой странице необходимо войти в систему.',
        hint: 'Пожалуйста, войдите в свой аккаунт, чтобы продолжить.',
        gradient: 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600',
        titleColor: 'text-yellow-600',
        icon: LockIcon,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        detailsBg: 'bg-yellow-50',
        detailsBorder: 'border border-yellow-200',
        detailsText: 'text-yellow-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: false,
        showLinks: false,
      };

    case 403:
      return {
        title: 'Доступ запрещен',
        description: 'У вас нет прав для доступа к этой странице.',
        hint: 'Обратитесь к администратору, если считаете, что это ошибка.',
        gradient: 'bg-gradient-to-r from-red-600 via-red-500 to-red-600',
        titleColor: 'text-red-600',
        icon: LockIcon,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        detailsBg: 'bg-red-50',
        detailsBorder: 'border border-red-200',
        detailsText: 'text-red-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: false,
        showLinks: true,
      };

    case 404:
      return {
        title: 'Страница не найдена',
        description: 'К сожалению, запрашиваемая страница не существует или была перемещена.',
        hint: 'Проверьте правильность URL или вернитесь на главную страницу.',
        gradient: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900',
        titleColor: 'text-gray-900',
        icon: null,
        iconBg: '',
        iconColor: '',
        detailsBg: 'bg-gray-50',
        detailsBorder: 'border border-gray-200',
        detailsText: 'text-gray-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: false,
        showLinks: true,
      };

    case 408:
      return {
        title: 'Превышено время ожидания',
        description: 'Сервер не получил запрос в течение установленного времени.',
        hint: 'Проверьте подключение к интернету и попробуйте снова.',
        gradient: 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600',
        titleColor: 'text-blue-600',
        icon: WifiIcon,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        detailsBg: 'bg-blue-50',
        detailsBorder: 'border border-blue-200',
        detailsText: 'text-blue-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    case 429:
      return {
        title: 'Слишком много запросов',
        description: 'Вы превысили лимит запросов. Пожалуйста, подождите немного.',
        hint: 'Попробуйте повторить запрос через несколько секунд.',
        gradient: 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600',
        titleColor: 'text-purple-600',
        icon: ErrorIcon,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        detailsBg: 'bg-purple-50',
        detailsBorder: 'border border-purple-200',
        detailsText: 'text-purple-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    case 500:
      return {
        title: 'Внутренняя ошибка сервера',
        description: 'На сервере произошла непредвиденная ошибка.',
        hint: 'Мы уже работаем над устранением проблемы. Попробуйте позже.',
        gradient: 'bg-gradient-to-r from-red-700 via-red-600 to-red-700',
        titleColor: 'text-red-700',
        icon: ServerIcon,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-700',
        detailsBg: 'bg-red-50',
        detailsBorder: 'border border-red-200',
        detailsText: 'text-red-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    case 502:
      return {
        title: 'Ошибка шлюза',
        description: 'Сервер получил неверный ответ от вышестоящего сервера.',
        hint: 'Проблема на стороне сервера. Попробуйте позже или обновите страницу.',
        gradient: 'bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700',
        titleColor: 'text-orange-700',
        icon: ServerIcon,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-700',
        detailsBg: 'bg-orange-50',
        detailsBorder: 'border border-orange-200',
        detailsText: 'text-orange-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    case 503:
      return {
        title: 'Сервис недоступен',
        description: 'Сервер временно недоступен из-за технического обслуживания или перегрузки.',
        hint: 'Пожалуйста, попробуйте позже. Мы работаем над восстановлением сервиса.',
        gradient: 'bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700',
        titleColor: 'text-yellow-700',
        icon: ServerIcon,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-700',
        detailsBg: 'bg-yellow-50',
        detailsBorder: 'border border-yellow-200',
        detailsText: 'text-yellow-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    case 504:
      return {
        title: 'Превышено время ожидания шлюза',
        description: 'Сервер не получил ответ от вышестоящего сервера вовремя.',
        hint: 'Попробуйте обновить страницу или вернуться позже.',
        gradient: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700',
        titleColor: 'text-blue-700',
        icon: WifiIcon,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700',
        detailsBg: 'bg-blue-50',
        detailsBorder: 'border border-blue-200',
        detailsText: 'text-blue-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };

    default:
      return {
        title: 'Произошла ошибка',
        description: 'При загрузке страницы произошла непредвиденная ошибка.',
        hint: 'Попробуйте обновить страницу или вернуться на главную.',
        gradient: 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700',
        titleColor: 'text-gray-700',
        icon: ErrorIcon,
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-700',
        detailsBg: 'bg-gray-50',
        detailsBorder: 'border border-gray-200',
        detailsText: 'text-gray-800',
        showHomeButton: true,
        showBackButton: true,
        showRetryButton: true,
        showLinks: true,
      };
  }
});

// Детали ошибки для отображения
const errorDetails = computed(() => {
  const error = props.error;
  if (!error) return null;

  const parts: string[] = [];
  if (error.statusMessage) parts.push(error.statusMessage);
  if (error.message && error.message !== error.statusMessage) parts.push(error.message);

  return parts.length > 0 ? parts.join('. ') : null;
});

// SEO для страницы ошибки
useSeoMeta({
  title: computed(() => `${statusCode.value} - ${errorInfo.value.title}`),
  description: computed(() => errorInfo.value.description),
  robots: 'noindex, nofollow',
});

// Функция для возврата назад
function goBack() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo('/');
  }
}

// Функция для повторной попытки
function retry() {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}
</script>
