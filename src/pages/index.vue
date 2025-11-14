<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <div class="mb-8 sm:mb-12">
      <div v-if="isLoading" class="text-center">
        <SharedUiSkeleton class="h-10 w-72 mx-auto mb-3" />
        <SharedUiSkeleton class="h-6 w-64 mx-auto" />
      </div>
      <div v-else class="text-center">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3"
        >
          Marketplace
        </h1>
        <p class="text-gray-600 text-lg">Найдите лучшие предложения</p>
      </div>
    </div>

    <!-- Loading State - Skeleton -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
    >
      <ProductCardSkeleton v-for="n in pageSize" :key="`skeleton-${n}`" />
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :style="{ animationDelay: `${index * 0.05}s` }"
        class="animate-fade-in-up"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="data && products.length === 0" class="text-center py-16 sm:py-24">
      <div class="max-w-md mx-auto">
        <div class="mb-6">
          <svg
            class="mx-auto h-24 w-24 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Товары не найдены</h2>
        <p class="text-gray-600">Попробуйте изменить параметры поиска</p>
      </div>
    </div>

    <!-- Infinite Scroll Trigger -->
    <div ref="loadMoreTrigger" class="h-10"></div>

    <!-- Loading More -->
    <div v-if="loadingMore" class="text-center py-8">
      <div class="inline-flex flex-col items-center gap-3">
        <div
          class="inline-block animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"
        ></div>
        <p class="text-sm text-gray-600">Загрузка товаров...</p>
      </div>
    </div>

    <!-- End of List -->
    <div v-if="!hasMore && products.length > 0" class="text-center py-8">
      <div class="inline-flex items-center gap-2 text-gray-500">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="text-sm font-medium">Все товары загружены</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem, ProductsListResponse } from '@/entity/product/model/types';
import { useProductApi } from '@/entity/product/api/useProductApi';
import ProductCard from '@/entity/product/ui/ProductCard.vue';
import ProductCardSkeleton from '@/entity/product/ui/ProductCardSkeleton.vue';
import SharedUiSkeleton from '@/shared/components/ui/skeleton/Skeleton.vue';

// SEO для главной страницы
useSeoMeta({
  title: 'Marketplace - Лучшие предложения и цены',
  description:
    'Marketplace - онлайн-платформа для покупки товаров. Широкий ассортимент, лучшие цены от проверенных продавцов, быстрая доставка. Найдите нужный товар среди тысяч предложений.',
  keywords: 'marketplace, магазин, покупки, товары, доставка, цены, продавцы, онлайн магазин',
  ogTitle: 'Marketplace - Лучшие предложения и цены',
  ogDescription:
    'Marketplace - онлайн-платформа для покупки товаров. Широкий ассортимент, лучшие цены от проверенных продавцов.',
  ogImage: '/og-image.png',
  ogUrl: '/',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Marketplace - Лучшие предложения и цены',
  twitterDescription:
    'Marketplace - онлайн-платформа для покупки товаров. Широкий ассортимент, лучшие цены.',
});

// JSON-LD структурированные данные для главной страницы
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Marketplace',
        description: 'Онлайн-платформа для покупки товаров. Лучшие цены от проверенных продавцов.',
        url: '/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: '/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Marketplace',
        url: '/',
        logo: '/favicon-512x512.svg',
        sameAs: [],
      }),
    },
  ],
});

const pageSize = 20;
const page = ref(1);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const products = ref<ProductListItem[]>([]);
const hasMore = ref(true);
const loadingMore = ref(false);
const error = ref<any>(null);

const api = useProductApi();

// Загружаем первую страницу
const { data, pending } = await useAsyncData<ProductsListResponse>(
  'products',
  () => api.getProducts(page.value, pageSize),
  {
    server: false, // Только на клиенте, так как используем mock API
  }
);

// Nuxt 3 автоматически управляет загрузкой CSS через css в nuxt.config.ts
// В production CSS инлайнится или загружается синхронно, поэтому достаточно pending

// Показываем skeleton пока данные загружаются или еще не получены
const isLoading = computed(() => pending.value || !data.value);

watch(
  data,
  (newData) => {
    if (newData) {
      products.value = newData.products;
      hasMore.value = products.value.length < newData.total;
    }
  },
  { immediate: true }
);

watch(
  error,
  (err) => {
    if (err) {
      console.error('Ошибка загрузки продуктов:', err);
    }
  },
  { immediate: true }
);

// Функция для загрузки следующей страницы
async function loadMore() {
  if (!hasMore.value || loadingMore.value) return;

  loadingMore.value = true;
  page.value++;

  try {
    const newData = await api.getProducts(page.value, pageSize);
    if (newData) {
      products.value.push(...newData.products);
      hasMore.value = products.value.length < newData.total;
    }
  } catch (err) {
    error.value = err;
  } finally {
    loadingMore.value = false;
  }
}

// Intersection Observer для бесконечного скроллинга
onMounted(() => {
  if (!loadMoreTrigger.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasMore.value && !loadingMore.value) {
        loadMore();
      }
    },
    {
      rootMargin: '100px',
    }
  );

  watch(
    loadMoreTrigger,
    (newVal) => {
      if (newVal) {
        observer.observe(newVal);
      }
    },
    { immediate: true }
  );

  // Наблюдаем за элементом сразу, если он уже доступен
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
