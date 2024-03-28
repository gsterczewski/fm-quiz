<script setup lang="ts">
type CardProps = {
  text: string;
};
defineProps<CardProps>();
</script>
<template>
  <div class="flex items-center gap-4 md:gap-8 p-3 bg-white rounded-md">
    <slot></slot>
    <p class="text-lg md:text-3xl font-medium text-blue-900">{{ text }}</p>
  </div>
</template>
