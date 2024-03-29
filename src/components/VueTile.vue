<script setup lang="ts">
import { computed } from 'vue';
const colorsMap = {
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  gray: 'bg-gray-100'
} as const;
type TileProps = {
  color?: string;
};
const props = withDefaults(defineProps<TileProps>(), {
  color: 'gray'
});
const background = computed(() => colorsMap[props.color as keyof typeof colorsMap] || colorsMap.gray);
</script>
<template>
  <div class="w-10 flex items-center justify-center aspect-square rounded" :class="background">
    <slot></slot>
  </div>
</template>
