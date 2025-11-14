<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
  }>(),
  {
    class: undefined,
  }
);
</script>

<template>
  <nav aria-label="breadcrumb" :class="props.class">
    <slot />
  </nav>
</template>
