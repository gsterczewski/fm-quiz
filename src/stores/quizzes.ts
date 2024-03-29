import { defineStore } from 'pinia';
import quizzesData from '../data.json';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};
type Quiz = {
  key: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
};

export const useQuizzesStore = defineStore('quizes', () => {
  const createIconPath = (icon: string) => `/${icon}`;
  const quizzes: readonly Quiz[] = quizzesData.quizzes.map(({ title, questions, color, icon }) => ({
    title,
    questions,
    icon: createIconPath(icon),
    color,
    key: title.toLowerCase()
  }));
  const getQuizz = (key: string): Quiz | undefined => quizzes.find((quizz) => quizz.key === key);

  return { quizzes, getQuizz };
});
