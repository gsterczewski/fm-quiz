import { defineStore } from 'pinia';
import quizzesData from '../data.json';
import { type QuizData } from '@/types';

export const useQuizzesStore = defineStore('quizes', () => {
  const createIconPath = (icon: string) => `/${icon}`;
  const quizzes: readonly QuizData[] = quizzesData.quizzes.map(({ title, questions, color, icon }) => ({
    title,
    questions,
    icon: createIconPath(icon),
    color,
    key: title.toLowerCase()
  }));
  const getQuizz = (key: string): QuizData | undefined => quizzes.find((quizz) => quizz.key === key);

  return { quizzes, getQuizz };
});
