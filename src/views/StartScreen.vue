<script setup lang="ts">
import CaptionText from '@components/CaptionText.vue';
import VueCard from '@components/VueCard.vue';
import VueTile from '@components/VueTile.vue';
import VueLayout from '@components/VueLayout.vue';
import { useQuizzesStore } from '@stores/quizzes';
const { quizzes } = useQuizzesStore();
</script>

<template>
  <main>
    <VueLayout>
      <div class="flex-1">
        <h1 class="max-w-sm md:max-w-md font-light text-4xl md:text-6xl text-blue-900 mb-4">
          Welcome to the <span class="font-bold">Frontend Quiz!</span>
        </h1>
        <CaptionText>Pick a subject to get started...</CaptionText>
      </div>
      <nav class="flex flex-col gap-3 md:gap-6 flex-1">
        <RouterLink
          v-for="quiz in quizzes"
          :key="quiz.key"
          :to="`/quizz/${quiz.key}`"
          class="link border-2 border-transparent rounded-md outline-none transition-all"
        >
          <VueCard>
            <VueTile :color="quiz.color">
              <img alt="" :src="quiz.icon" class="w-10" />
            </VueTile>
            <p class="text-lg md:text-3xl font-medium text-blue-900">{{ quiz.title }}</p>
          </VueCard>
        </RouterLink>
      </nav>
    </VueLayout>
  </main>
</template>
<style scoped>
.link:hover,
.link:focus {
  @apply border-purple-500 scale-105 md:scale-110 lg:-translate-x-10;
}
</style>
