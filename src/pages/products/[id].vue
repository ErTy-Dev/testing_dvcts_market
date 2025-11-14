<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <!-- Breadcrumbs -->
    <SharedUiBreadcrumb class="mb-6">
      <SharedUiBreadcrumbList>
        <SharedUiBreadcrumbItem>
          <SharedUiBreadcrumbLink href="/"> Главная </SharedUiBreadcrumbLink>
        </SharedUiBreadcrumbItem>
        <SharedUiBreadcrumbSeparator />
        <SharedUiBreadcrumbItem>
          <SharedUiBreadcrumbLink href="/"> Products </SharedUiBreadcrumbLink>
        </SharedUiBreadcrumbItem>
        <SharedUiBreadcrumbSeparator />
        <SharedUiBreadcrumbItem>
          <SharedUiBreadcrumbPage>
            {{ productDetail?.name || 'Загрузка...' }}
          </SharedUiBreadcrumbPage>
        </SharedUiBreadcrumbItem>
      </SharedUiBreadcrumbList>
    </SharedUiBreadcrumb>

    <!-- Product Detail -->
    <div v-if="pending || !productDetail" class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Left: Product Photo Skeleton -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-soft p-4 aspect-square">
            <SharedUiSkeleton class="w-full h-full rounded-lg" />
          </div>
        </div>

        <!-- Middle: Product Info Skeleton -->
        <div class="lg:col-span-1 space-y-6">
          <div>
            <SharedUiSkeleton class="h-10 w-3/4 mb-4" />
            <div class="flex items-center gap-3 mb-6">
              <SharedUiSkeleton class="h-5 w-24" />
              <SharedUiSkeleton class="h-4 w-16" />
            </div>
          </div>

          <!-- Attributes Skeleton -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <SharedUiSkeleton class="h-6 w-32 mb-4" />
            <div class="space-y-3">
              <div
                v-for="n in 4"
                :key="n"
                class="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <SharedUiSkeleton class="h-4 w-24" />
                <SharedUiSkeleton class="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Seller Offers Skeleton -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-medium p-6 sticky top-6">
            <SharedUiSkeleton class="h-6 w-48 mb-4" />
            <div class="flex flex-wrap gap-2.5 mb-6">
              <SharedUiSkeleton class="h-9 w-24" />
              <SharedUiSkeleton class="h-9 w-32" />
            </div>
            <div class="space-y-3">
              <div
                v-for="n in 3"
                :key="n"
                class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <div class="flex justify-between items-start gap-4 mb-3">
                  <div class="flex-1">
                    <SharedUiSkeleton class="h-5 w-24 mb-2" />
                    <SharedUiSkeleton class="h-4 w-20" />
                  </div>
                  <SharedUiSkeleton class="h-7 w-24" />
                </div>
                <SharedUiSkeleton class="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="productDetail" class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Left: Product Photo -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-xl shadow-soft p-4 aspect-square flex items-center justify-center overflow-hidden group"
          >
            <img
              :src="productDetail.photo"
              :alt="productDetail.name"
              class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Middle: Product Info -->
        <div class="lg:col-span-1 space-y-6">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {{ productDetail.name }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6">
              <SharedUiStarRating :rating="4.2" />
              <span class="text-gray-600 font-medium">4.2</span>
              <span class="text-gray-400">|</span>
              <span class="text-sm text-gray-500">Артикул: {{ productDetail.id }}</span>
            </div>
          </div>

          <!-- Attributes -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Характеристики</h2>
            <div class="space-y-3">
              <div
                v-for="attr in productDetail.attributes"
                :key="attr.key"
                class="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span class="font-medium text-gray-700">{{ attr.key }}:</span>
                <span class="text-gray-600 text-right max-w-[60%]">{{ attr.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Seller Offers -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-medium p-6 sticky top-6">
            <!-- Sorting -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Предложения продавцов</h3>
              <div class="flex flex-wrap gap-2.5">
                <SharedUiButton
                  :variant="sortBy === 'price' ? 'default' : 'outline'"
                  size="sm"
                  class="gap-2"
                  @click="handleSortChange('price')"
                >
                  <svg
                    v-if="sortBy === 'price'"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  По цене
                </SharedUiButton>
                <SharedUiButton
                  :variant="sortBy === 'delivery' ? 'default' : 'outline'"
                  size="sm"
                  class="gap-2"
                  @click="handleSortChange('delivery')"
                >
                  <svg
                    v-if="sortBy === 'delivery'"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  По дате доставки
                </SharedUiButton>
              </div>
            </div>

            <!-- Seller Offers List -->
            <ClientOnly>
              <div
                v-if="offersPending"
                class="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
              >
                <div
                  v-for="n in 3"
                  :key="n"
                  class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4"
                >
                  <div class="flex justify-between items-start gap-4 mb-3">
                    <div class="flex-1">
                      <SharedUiSkeleton class="h-5 w-24 mb-2" />
                      <SharedUiSkeleton class="h-4 w-20" />
                    </div>
                    <SharedUiSkeleton class="h-7 w-24" />
                  </div>
                  <SharedUiSkeleton class="h-4 w-32" />
                </div>
              </div>
              <div v-else class="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <SellerOfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
              </div>
              <template #fallback>
                <div class="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <div
                    v-for="n in 3"
                    :key="n"
                    class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4"
                  >
                    <div class="flex justify-between items-start gap-4 mb-3">
                      <div class="flex-1">
                        <SharedUiSkeleton class="h-5 w-24 mb-2" />
                        <SharedUiSkeleton class="h-4 w-20" />
                      </div>
                      <SharedUiSkeleton class="h-7 w-24" />
                    </div>
                    <SharedUiSkeleton class="h-4 w-32" />
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '@/entity/product/model/types';
import { useProductApi } from '@/entity/product/api/useProductApi';
import SellerOfferCard from '@/entity/product/ui/SellerOfferCard.vue';
import SharedUiStarRating from '@/shared/components/StarRating.vue';
import SharedUiSkeleton from '@/shared/components/ui/skeleton/Skeleton.vue';
import SharedUiButton from '@/shared/components/ui/button/Button.vue';
import {
  Breadcrumb as SharedUiBreadcrumb,
  BreadcrumbList as SharedUiBreadcrumbList,
  BreadcrumbItem as SharedUiBreadcrumbItem,
  BreadcrumbLink as SharedUiBreadcrumbLink,
  BreadcrumbPage as SharedUiBreadcrumbPage,
  BreadcrumbSeparator as SharedUiBreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';

// Включаем SSR для этой страницы
definePageMeta({
  ssr: true,
});

const route = useRoute();
const productId = route.params.id as string;

const sortBy = ref<'price' | 'delivery'>('price');
const api = useProductApi();

// Загружаем детали продукта через SSR (без offers)
const { data: productDetail, pending } = await useAsyncData<ProductDetail>(
  `product-${productId}`,
  () => api.getProductDetail(productId),
  {
    server: true, // Включаем SSR для основного контента
  }
);

// Загружаем offers отдельно на клиенте с сортировкой
const {
  data: offersData,
  pending: offersPending,
  refresh: _refreshOffers,
} = await useAsyncData(
  () => `product-${productId}-offers-${sortBy.value}`,
  () => api.getProductOffers(productId, sortBy.value),
  {
    server: false, // Только на клиенте
    watch: [sortBy], // Отслеживаем изменения sortBy
  }
);

// Вычисляемое свойство для offers
const offers = computed(() => offersData.value?.offers || []);

// SEO Meta теги
const config = useRuntimeConfig();
const baseUrl =
  typeof window !== 'undefined'
    ? window.location.origin
    : config.public.apiBase?.replace('/api', '') || '';
const productUrl = `${baseUrl}/products/${productId}`;

// Формируем описание из характеристик
const productDescription = computed(() => {
  if (!productDetail.value) return '';

  const attributes = productDetail.value.attributes
    .slice(0, 3)
    .map((attr) => `${attr.key}: ${attr.value}`)
    .join(', ');

  return `Купить ${productDetail.value.name}. ${attributes}. Лучшие цены от проверенных продавцов.`;
});

// Минимальная цена из offers
const minPrice = computed(() => {
  if (!offers.value.length) return null;
  const prices = offers.value.map((o) => o.price);
  return Math.min(...prices);
});

// Валюта минимальной цены
const minPriceCurrency = computed(() => {
  if (!offers.value.length) return null;
  const minOffer = offers.value.find((o) => o.price === minPrice.value);
  return minOffer?.currency || null;
});

// Форматирование цены для SEO
const _formattedPrice = computed(() => {
  if (!minPrice.value || !minPriceCurrency.value) return null;
  return `${minPrice.value.toFixed(2)} ${minPriceCurrency.value}`;
});

// Обработчик изменения сортировки
const handleSortChange = async (newSortBy: 'price' | 'delivery') => {
  if (sortBy.value === newSortBy) return;

  sortBy.value = newSortBy;
  // useAsyncData автоматически перезагрузит offers благодаря watch: [sortBy]
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/600x400?text=No+Image';
};

// SEO Meta
useSeoMeta({
  title: () =>
    productDetail.value
      ? `${productDetail.value.name} - купить в Marketplace`
      : 'Товар - Marketplace',

  description: () =>
    productDescription.value || 'Купить товар в Marketplace. Лучшие цены от проверенных продавцов.',

  ogTitle: () => productDetail.value?.name || 'Товар - Marketplace',
  ogDescription: () => productDescription.value || 'Купить товар в Marketplace',
  ogImage: () => productDetail.value?.photo || '',
  ogUrl: () => productUrl,
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: () => productDetail.value?.name || 'Товар - Marketplace',
  twitterDescription: () => productDescription.value || 'Купить товар в Marketplace',
  twitterImage: () => productDetail.value?.photo || '',

  robots: 'index, follow',
  author: 'Marketplace',
});

// JSON-LD структурированные данные
const structuredData = computed(() => {
  if (!productDetail.value) return null;

  const maxPrice = offers.value.length ? Math.max(...offers.value.map((o) => o.price)) : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productDetail.value.name,
    image: productDetail.value.photo,
    description: productDescription.value,
    sku: productDetail.value.id,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: minPriceCurrency.value || 'RUR',
      lowPrice: minPrice.value?.toString() || '',
      highPrice: maxPrice?.toString() || '',
      offerCount: offers.value.length.toString() || '0',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '1',
    },
  };
});

// Дополнительные meta теги
useHead({
  link: [
    {
      rel: 'canonical',
      href: productUrl,
    },
  ],
  meta: computed(() => {
    const meta = [];
    if (minPrice.value && minPriceCurrency.value) {
      meta.push(
        { property: 'product:price:amount', content: minPrice.value.toString() },
        { property: 'product:price:currency', content: minPriceCurrency.value }
      );
    }
    return meta;
  }),
  script: computed(() =>
    structuredData.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(structuredData.value),
          },
        ]
      : []
  ),
});
</script>
