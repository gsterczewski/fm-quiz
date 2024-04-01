<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuizzesStore } from '@stores/quizzes';
import useQuiz from '@/composables/useQuiz';

import VueLayout from '@components/VueLayout.vue';
import CaptionText from '@components/CaptionText.vue';
import VueTile from '@/components/VueTile.vue';
import QuizForm from '@/components/Quiz/QuizForm.vue';

const route = useRoute();
const { getQuizz } = useQuizzesStore();
const quizKey = route.params.key;
const quizData = getQuizz(quizKey as string)!;
const quiz = useQuiz(quizData);
</script>
<template>
  <VueLayout v-if="quiz">
    <template v-slot:page-title>
      <div class="flex items-center gap-4 md:gap-6">
        <VueTile class="w-10 aspect-square md:w-14" :color="quizData.color">
          <img class="w-7 aspect-square md:w-10" :src="quizData.icon" />
        </VueTile>
        <p class="text-lg md:text-2xl text-blue-900 font-medium">{{ quizData.title }}</p>
      </div>
    </template>
    <template v-slot:main-content>
      <div class="flex-1">
        <CaptionText class="mb-3 md:mb-7">{{ `Question ${quiz.questionIndex.value + 1} of ${quiz.questionsCount}` }}</CaptionText>
        <p class="xl:max-w-md text-blue-900 font-medium text-xl md:text-4xl">{{ quiz.question }}</p>
      </div>
      <div class="flex-1">
        <QuizForm :quiz="quiz" />
      </div>
    </template>
  </VueLayout>
  <div v-else>
    <h1>Sorry something went wrong</h1>
    <RouterLink to="/" class="hover:text-blue-400 hover:underline">Go back to home page</RouterLink>
  </div>
</template>
