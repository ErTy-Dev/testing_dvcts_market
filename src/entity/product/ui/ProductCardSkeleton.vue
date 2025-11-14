<template>
  <div class="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
    <!-- Photo Skeleton -->
    <SharedUiSkeleton class="w-full h-48 sm:h-56 rounded-lg mb-4" />

    <!-- Name Skeleton -->
    <SharedUiSkeleton class="h-5 mb-2" />
    <SharedUiSkeleton class="h-5 w-3/4 mb-3" />

    <!-- Price Skeleton -->
    <SharedUiSkeleton class="h-8 w-1/2 mb-3" />

    <!-- Rating Skeleton -->
    <SharedUiSkeleton class="h-4 w-1/3 mb-3" />

    <!-- Stock & Delivery Skeleton -->
    <div class="space-y-2 pt-3 border-t border-gray-100">
      <SharedUiSkeleton class="h-4 w-2/3" />
      <SharedUiSkeleton class="h-4 w-3/4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SharedUiSkeleton from '@/shared/components/ui/skeleton/Skeleton.vue';
</script>
