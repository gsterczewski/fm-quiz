import { ref, computed, type Ref } from 'vue';
import { type QuizData, type Quiz, type QuizRoundResult, QUIZ_ROUND_RESULTS } from '@/types';

export default function useQuiz(quiz: Pick<QuizData, 'questions'>): Quiz {
  const questionsCount = quiz.questions.length;
  const currentQuestionIndex = ref(0);
  const answersCount = ref(0);
  const correctAnswersCount = ref(0);
  const result: Ref<QuizRoundResult> = ref(QUIZ_ROUND_RESULTS.NEW_QUESTION);

  const question = computed(() => quiz.questions[currentQuestionIndex.value].question);
  const answer = computed(() => quiz.questions[currentQuestionIndex.value].answer);
  const possibleAnswers = computed(() => quiz.questions[currentQuestionIndex.value].options);
  const isOver = computed(() => answersCount.value === questionsCount);

  function checkAnswer(userAnswer: string) {
    if (isOver.value) return;
    if (!userAnswer) {
      result.value = QUIZ_ROUND_RESULTS.NO_ANSWER;
      return;
    }
    if (userAnswer === answer.value) {
      correctAnswersCount.value++;
      result.value = QUIZ_ROUND_RESULTS.CORRECT_ANSWER;
      answersCount.value++;
      return;
    }
    answersCount.value++;
    result.value = QUIZ_ROUND_RESULTS.INCORRECT_ANSWER;
  }
  function nextQuestion() {
    if (currentQuestionIndex.value < questionsCount - 1) {
      currentQuestionIndex.value++;
      result.value = QUIZ_ROUND_RESULTS.NEW_QUESTION;
    }
  }
  return {
    question,
    answer,
    result,
    isOver,
    questionsCount,
    correctAnswersCount,
    checkAnswer,
    nextQuestion,
    possibleAnswers,
    questionIndex: currentQuestionIndex
  };
}
