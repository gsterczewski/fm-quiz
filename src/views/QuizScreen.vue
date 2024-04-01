<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuizzesStore } from '@stores/quizzes';
import useQuiz, { QUIZ_ROUND_RESULTS } from '@/composables/useQuiz';

import VueLayout from '@components/VueLayout.vue';
import CaptionText from '@components/CaptionText.vue';
import HeroButton from '@components/HeroButton.vue';
import QuizOption from '@components/QuizOption.vue';

const ANSWER_INDEXES = ['A', 'B', 'C', 'D'];
const route = useRoute();
const { getQuizz } = useQuizzesStore();
const quizKey = route.params.key;
const quiz = useQuiz(getQuizz(quizKey as string)!);
const selectedAnswer = ref('');

const answerSubmitted = computed(
  () => quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER || quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER
);
function handleClick() {
  if (quiz.isOver.value) {
    alert(`Results : ${quiz.correctAnswersCount.value}/${quiz.questionsCount}`);
    return;
  }
  if (answerSubmitted.value) {
    selectedAnswer.value = '';
    quiz.nextQuestion();
  } else {
    quiz.checkAnswer(selectedAnswer.value);
  }
}

const buttonLabel = computed(() => (quiz.isOver.value ? 'Show Results' : answerSubmitted.value ? 'Next Question' : 'Submit Answer'));
</script>
<template>
  <main>
    <VueLayout v-if="quiz">
      <div class="flex-1">
        <CaptionText class="mb-3 md:mb-7">{{ `Question ${quiz.questionIndex.value + 1} of ${quiz.questionsCount}` }}</CaptionText>
        <p class="xl:max-w-md text-blue-900 font-medium text-xl md:text-4xl">{{ quiz.question }}</p>
      </div>
      <div class="flex-1">
        <form>
          <QuizOption
            v-for="(option, index) in quiz.possibleAnswers.value"
            :key="index"
            input-name="answer"
            v-model="selectedAnswer"
            :input-value="option"
            :answer-index="ANSWER_INDEXES[index] || `${index + 1}`"
            :answer="option"
            :has-success="quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER && selectedAnswer === option"
            :has-error="quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER && selectedAnswer === option"
            :show-success-icon="
              quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER && selectedAnswer !== option && option === quiz.answer.value
            "
            :disabled="quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER || quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER"
          />

          <HeroButton type="submit" @click.prevent="handleClick">{{ buttonLabel }}</HeroButton>
          <p v-if="quiz.result.value === QUIZ_ROUND_RESULTS.NO_ANSWER" class="flex align-center justify-center text-red-500 mt-4 md:text-2xl">
            <img class="inline-block w-6 md:w-8 aspect-square mr-3" src="/icon-error.svg" /> <span>Please select and answer</span>
          </p>
        </form>
      </div>
    </VueLayout>
    <div v-else>
      <h1>Sorry something went wrong</h1>
      <RouterLink to="/" class="hover:text-blue-400 hover:underline">Go back to home page</RouterLink>
    </div>
  </main>
</template>
