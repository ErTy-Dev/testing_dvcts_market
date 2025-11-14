<template>
  <div class="flex items-center gap-0.5">
    <svg
      v-for="star in 5"
      :key="star"
      class="w-5 h-5"
      :class="
        star <= filledStars
          ? 'text-yellow-400 fill-current'
          : 'text-yellow-400 fill-none stroke-current'
      "
      viewBox="0 0 24 24"
      stroke-width="1.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number; // от 0 до 5
}

const props = defineProps<Props>();

const filledStars = Math.round(props.rating);
</script>
