<script setup lang="ts">
import { computed } from 'vue';
const colorsMap = {
  green: 'text-green-500 bg-green-100',
  purple: 'text-purple-500 bg-purple-100',
  blue: 'text-blue-500 bg-blue-100',
  red: 'text-red-500 bg-red-100',
  gray: 'text-gray-500 bg-gray-100'
} as const;
type TileProps = {
  color?: keyof typeof colorsMap;
};
const props = withDefaults(defineProps<TileProps>(), {
  color: 'gray'
});
const colors = computed(() => colorsMap[props.color]);
</script>
<template>
  <div class="w-12 flex items-center justify-center aspect-square rounded" :class="colors">
    <slot></slot>
  </div>
</template>
