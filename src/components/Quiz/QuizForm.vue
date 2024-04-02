<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Quiz, QUIZ_ROUND_RESULTS } from '@/types';
import QuizAnswer from '@components/Quiz/QuizAnswer.vue';
import HeroButton from '@components/HeroButton.vue';

type QuizFormProps = {
  quiz: Quiz;
};
const props = defineProps<QuizFormProps>();

const selectedAnswer = ref('');
const ANSWER_INDEXES = ['A', 'B', 'C', 'D'];
const answerSubmitted = computed(
  () => props.quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER || props.quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER
);
function handleClick() {
  if (props.quiz.isOver.value) {
    alert(`Results : ${props.quiz.correctAnswersCount.value}/${props.quiz.questionsCount}`);
    return;
  }
  if (answerSubmitted.value) {
    selectedAnswer.value = '';
    props.quiz.nextQuestion();
  } else {
    props.quiz.checkAnswer(selectedAnswer.value);
  }
}

const buttonLabel = computed(() => (props.quiz.isOver.value ? 'Show Results' : answerSubmitted.value ? 'Next Question' : 'Submit Answer'));
</script>
<template>
  <form>
    <div class="grid auto-rows-max gap-3 md:gap-6 mb-3 md:mb-8">
      <QuizAnswer
        v-for="(option, index) in quiz.possibleAnswers.value"
        :key="index"
        input-name="answer"
        v-model="selectedAnswer"
        :input-value="option"
        :answer-index="ANSWER_INDEXES[index] || `${index + 1}`"
        :answer="option"
        :has-success="quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER && selectedAnswer === option"
        :has-error="quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER && selectedAnswer === option"
        :show-success-icon="quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER && selectedAnswer !== option && option === quiz.answer.value"
        :disabled="quiz.result.value === QUIZ_ROUND_RESULTS.CORRECT_ANSWER || quiz.result.value === QUIZ_ROUND_RESULTS.INCORRECT_ANSWER"
      />
    </div>
    <HeroButton type="submit" @click.prevent="handleClick">{{ buttonLabel }}</HeroButton>
    <p v-if="quiz.result.value === QUIZ_ROUND_RESULTS.NO_ANSWER" class="flex align-center justify-center text-red-500 mt-4 md:text-2xl">
      <img class="inline-block w-6 md:w-8 aspect-square mr-3" src="/icon-error.svg" /> <span>Please select and answer</span>
    </p>
  </form>
</template>
