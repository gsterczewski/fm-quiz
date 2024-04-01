<script setup lang="ts">
import VueTile from '@components/VueTile.vue';
type VueTileProps = {
  text: string;
  icon: string;
  color: string;
};
defineProps<VueTileProps>();
</script>
<template>
  <div class="flex items-center gap-4 md:gap-6">
    <VueTile class="w-10 aspect-square md:w-14" :color="color">
      <img class="w-7 aspect-square md:w-10" :src="icon" />
    </VueTile>
    <p class="text-lg md:text-2xl text-blue-900 font-medium">{{ text }}</p>
  </div>
</template>
