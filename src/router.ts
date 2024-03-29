import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '@views/StartScreen.vue';
import QuizScreen from '@views/QuizScreen.vue';
const routes = [
  {
    path: '/',
    component: StartScreen
  },
  {
    path: '/quizz/:key',
    component: QuizScreen
  }
];
const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;
