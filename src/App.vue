<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const { useDarkTheme } = storeToRefs(useUserStore());
</script>

<template>
  <div
    class="h-full bg-mobile dark:bg-mobile-dark md:bg-tablet md:dark:bg-tablet-dark lg:bg-desktop lg:dark:bg-desktop-dark bg-no-repeat bg-cover bg-gray-100"
    :class="{ dark: useDarkTheme }"
  >
    <router-view></router-view>
  </div>
</template>
