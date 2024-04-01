<script setup lang="ts">
import ThemeSwitcher from '@components/ThemeSwitcher.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const { useDarkTheme } = storeToRefs(useUserStore());
const { switchTheme } = useUserStore();
</script>
<template>
  <header class="h-17 md:h-36 lg:h-56 flex justify-between items-center">
    <div class="flex">
      <slot></slot>
    </div>
    <div class="flex gap-2 md:gap-4">
      <img v-if="useDarkTheme" src="/icon-sun-light.svg" alt="" />
      <img v-else src="/icon-sun-dark.svg" alt="" />
      <ThemeSwitcher :handle-switch="switchTheme" />
      <img v-if="useDarkTheme" src="/icon-moon-light.svg" alt="" />
      <img v-else src="/icon-moon-dark.svg" alt="" />
    </div>
  </header>
</template>
