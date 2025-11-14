<template>
  <SharedUiDevelopmentModal>
    <div
      class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-medium hover:border-blue-300 transition-all duration-300 group cursor-pointer"
    >
      <div class="flex justify-between items-start gap-4 mb-3">
        <div class="flex-1 min-w-0">
          <h4
            class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate"
          >
            {{ offer.sellerName }}
          </h4>
          <div class="flex items-center gap-2 flex-wrap">
            <SharedUiStarRating :rating="offer.rating" />
            <span class="text-sm font-medium text-gray-700">{{ offer.rating.toFixed(1) }}</span>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {{ formatPrice(offer.price, offer.currency) }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-100">
        <svg
          class="h-4 w-4 text-blue-500 flex-shrink-0"
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
        <span class="font-medium"
          >Доставка:
          <span class="text-gray-900">{{ formatDeliveryDate(offer.deliveryDate) }}</span></span
        >
      </div>
    </div>
  </SharedUiDevelopmentModal>
</template>

<script setup lang="ts">
import type { SellerOffer } from '../model/types';
import { formatDeliveryDate } from '../helpers/formatDeliveryDate';
import SharedUiStarRating from '~/shared/components/StarRating.vue';
import SharedUiDevelopmentModal from '@/shared/components/DevelopmentModal.vue';

interface Props {
  offer: SellerOffer;
}

const props = defineProps<Props>();

const formatPrice = (price: number, currency: string): string => {
  return `${price.toFixed(2)} ${currency}`;
};
</script>
