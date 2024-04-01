import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { type Quiz, type QuizQuestion } from '@stores/quizzes';

export const QUIZ_ROUND_RESULTS = {
  NEW_QUESTION: 0,
  NO_ANSWER: 1,
  INCORRECT_ANSWER: 2,
  CORRECT_ANSWER: 3
} as const;

type QuizRoundResult = (typeof QUIZ_ROUND_RESULTS)[keyof typeof QUIZ_ROUND_RESULTS];

export type UseQuizComposable = {
  question: ComputedRef<QuizQuestion['question']>;
  answer: ComputedRef<string>;
  questionIndex: Ref<number>;
  result: Ref<QuizRoundResult>;
  isOver: ComputedRef<boolean>;
  questionsCount: number;
  correctAnswersCount: Ref<number>;
  possibleAnswers: ComputedRef<string[]>;
  checkAnswer: (userAnswer: string) => void;
  nextQuestion: () => void;
};
export default function useQuiz(quiz: Pick<Quiz, 'questions'>): UseQuizComposable {
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
