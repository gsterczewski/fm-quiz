<script setup lang="ts">
import VueHeader from '@components/VueHeader.vue';
</script>
<template>
  <div class="max-w-6xl mx-auto px-6 md:px-16">
    <div class="mb-8 md:mb-0">
      <VueHeader>
        <slot name="page-title"></slot>
      </VueHeader>
    </div>
    <main class="flex flex-col gap-10 md:gap-16 xl:flex-row xl:gap-0 xl:px-0">
      <slot name="main-content"></slot>
    </main>
  </div>
</template>
