<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuizzesStore } from '@stores/quizzes';
import useQuiz from '@/composables/useQuiz';

import HeroText from '@components/HeroText.vue';
import VueLayout from '@components/VueLayout.vue';
import VueTitle from '@/components/VueTitle.vue';
import CaptionText from '@components/CaptionText.vue';
import QuizForm from '@/components/Quiz/QuizForm.vue';
import QuizResults from '@/components/Quiz/QuizResults.vue';

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
      <div class="flex-1">
        <CaptionText class="mb-3 md:mb-7">{{ `Question ${quiz.questionIndex.value + 1} of ${quiz.questionsCount}` }}</CaptionText>
        <p class="xl:max-w-md text-blue-900 font-medium text-xl/tight md:text-4xl/tight">{{ quiz.question }}</p>
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
