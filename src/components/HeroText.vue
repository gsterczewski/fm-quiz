<script setup lang="ts">
type VueTitleProps = {
  text: string;
  textBold: string;
};
defineProps<VueTitleProps>();
</script>
<template>
  <h1 class="max-w-sm md:max-w-md font-light text-4xl md:text-6xl text-blue-900 mb-4">
    {{ text }} <span class="font-bold">{{ textBold }}</span>
  </h1>
</template>
