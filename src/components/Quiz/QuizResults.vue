<script setup lang="ts">
import HeroButton from '@components/HeroButton.vue';
import VueTitle from '@components/VueTitle.vue';

type QuizResultsProps = {
  score: number;
  maxScore: number;
  icon: string;
  color: string;
  title: string;
};
defineProps<QuizResultsProps>();
</script>

<template>
  <div>
    <div class="w-full bg-white flex flex-col gap-4 md:gap-12 py-8 md:py-12 items-center rounded-lg mb-3 md:mb-8">
      <VueTitle :icon="icon" :color="color" :text="title" />
      <p class="text-7xl text-blue-900 font-medium md:text-9xl">{{ score }}</p>
      <p class="text-lg md:text-2xl text-gray-500">out of {{ maxScore }}</p>
    </div>
    <HeroButton :as-link="true" to="/">Play Again</HeroButton>
  </div>
</template>
