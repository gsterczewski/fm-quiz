<template>
  <button class="hero-button outline-none w-full text-lg md:text-3xl font-medium py-4 md:py-8 rounded-md bg-purple-500 text-white">
    <slot></slot>
  </button>
</template>
<style scoped>
.hero-button:hover,
.hero-button:focus {
  @apply bg-purple-200;
}
</style>
