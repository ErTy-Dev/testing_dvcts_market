<template>
  <div
    class="bg-white rounded-xl shadow-soft border border-gray-100 p-4 sm:p-5 cursor-pointer hover:shadow-strong hover:-translate-y-1 transition-all duration-300 group"
    @click="navigateToProduct"
  >
    <!-- Photo -->
    <div
      class="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative"
    >
      <img
        :src="product.photo"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </div>

    <!-- Product Name -->
    <h3
      class="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors"
    >
      {{ product.name }}
    </h3>

    <!-- Price -->
    <div
      class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
    >
      {{ formatPrice(product.price, product.currency) }}
    </div>

    <!-- Star Rating -->
    <div class="flex items-center gap-2 mb-3">
      <SharedUiStarRating :rating="4" />
      <span class="text-xs text-gray-500">(4.0)</span>
    </div>

    <!-- Stock & Delivery -->
    <div class="space-y-2 pt-3 border-t border-gray-100">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span
          >В наличии: <span class="font-medium text-gray-900">{{ product.stock }}</span></span
        >
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <svg class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span
          >Доставка:
          <span class="font-medium text-gray-900">{{
            formatDeliveryDate(product.deliveryDate)
          }}</span></span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem } from '@/entity/product/model/types';
import SharedUiStarRating from '@/shared/components/StarRating.vue';
import { formatDeliveryDate } from '@/entity/product/helpers/formatDeliveryDate';

interface Props {
  product: ProductListItem;
}

const props = defineProps<Props>();

const formatPrice = (price: number, currency: string): string => {
  return `${price.toFixed(2)} ${currency}`;
};

const navigateToProduct = () => {
  navigateTo(`/products/${props.product.id}`);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/300x200?text=No+Image';
};
</script>
