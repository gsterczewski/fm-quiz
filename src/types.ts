import { type ComputedRef, type Ref } from 'vue';

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type QuizData = {
  key: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
};

export const QUIZ_ROUND_RESULTS = {
  NEW_QUESTION: 0,
  NO_ANSWER: 1,
  INCORRECT_ANSWER: 2,
  CORRECT_ANSWER: 3
} as const;

export type QuizRoundResult = (typeof QUIZ_ROUND_RESULTS)[keyof typeof QUIZ_ROUND_RESULTS];

export type Quiz = {
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
