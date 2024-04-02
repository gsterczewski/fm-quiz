<script setup lang="ts">
type HeroButtonProps = {
  asLink?: boolean;
  to?: string;
};
withDefaults(defineProps<HeroButtonProps>(), {
  asLink: false,
  to: ''
});
</script>
<template>
  <RouterLink v-if="asLink" :to="to" class="hero-button block text-center">
    <slot></slot>
  </RouterLink>
  <button v-else class="hero-button">
    <slot></slot>
  </button>
</template>
<style scoped>
.hero-button {
  @apply outline-none w-full text-lg/none md:text-3xl/none font-medium py-5 md:py-8 rounded-xl md:rounded-3xl bg-purple-500 text-white;
}
.hero-button:hover,
.hero-button:focus {
  @apply bg-purple-200;
}
</style>
