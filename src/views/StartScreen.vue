<script setup lang="ts">
import CaptionText from '@components/CaptionText.vue';
import VueCard from '@components/VueCard.vue';
import VueTile from '@components/VueTile.vue';
import { useQuizzesStore } from '@stores/quizzes';
const { quizzes } = useQuizzesStore();
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 md:px-16 flex flex-col gap-10 md:gap-16 xl:flex-row xl:gap-0 xl:px-0">
    <div class="flex-1">
      <h1 class="max-w-sm md:max-w-md font-light text-4xl md:text-6xl text-blue-900 mb-4">
        Welcome to the <span class="font-bold">Frontend Quiz!</span>
      </h1>
      <CaptionText>Pick a subject to get started...</CaptionText>
    </div>
    <div class="flex flex-col gap-3 md:gap-6 flex-1">
      <RouterLink
        v-for="quiz in quizzes"
        :key="quiz.key"
        :to="`/quizz?title=${quiz.key}`"
        class="link border-2 border-transparent rounded-md outline-none transition-all"
      >
        <VueCard :text="quiz.title">
          <VueTile :color="quiz.color">
            <img :src="quiz.icon" class="w-10" />
          </VueTile>
        </VueCard>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
.link:hover,
.link:focus {
  @apply border-purple-500 scale-105 md:scale-110 lg:-translate-x-10;
}
</style>
