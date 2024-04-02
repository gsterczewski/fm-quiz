<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuizzesStore } from '@stores/quizzes';
import useQuiz from '@/composables/useQuiz';

import HeroText from '@components/HeroText.vue';
import VueLayout from '@components/VueLayout.vue';
import VueTitle from '@components/VueTitle.vue';
import CaptionText from '@components/CaptionText.vue';
import QuizForm from '@components/Quiz/QuizForm.vue';
import QuizResults from '@components/Quiz/QuizResults.vue';
import ProgressBar from '@components/ProgressBar.vue';

const route = useRoute();
const { getQuizz } = useQuizzesStore();
const quizKey = route.params.key;
const quizData = getQuizz(quizKey as string)!;
const quiz = useQuiz(quizData);
</script>
<template>
  <VueLayout v-if="quiz">
    <template v-slot:page-title>
      <VueTitle :text="quizData.title" :color="quizData.color" :icon="quizData.icon" />
    </template>
    <template v-slot:main-content v-if="quiz.isOver.value">
      <HeroText text="Quiz completed" textBold="You scored..." class="flex-1" />
      <QuizResults
        class="flex-1"
        :score="quiz.correctAnswersCount.value"
        :max-score="quiz.questionsCount"
        :color="quizData.color"
        :icon="quizData.icon"
        :title="quizData.title"
      />
    </template>

    <template v-slot:main-content v-else>
      <div class="flex flex-col gap-6 md:gap-10 lg:gap-0">
        <div class="basis-3/4">
          <CaptionText id="question-counter" class="mb-3 md:mb-7">{{
            `Question ${quiz.questionIndex.value + 1} of ${quiz.questionsCount}`
          }}</CaptionText>
          <p class="xl:max-w-md text-blue-900 font-medium text-xl/tight md:text-4xl/tight">{{ quiz.question }}</p>
        </div>
        <div class="h-4">
          <ProgressBar :max="quiz.questionsCount" :value="quiz.questionIndex.value + 1" aria-labelledby="question-counter" />
        </div>
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
