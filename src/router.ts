import { createRouter, createMemoryHistory } from 'vue-router';
import StartScreen from '@views/StartScreen.vue';

const routes = [
  {
    path: '/',
    component: StartScreen
  }
];
const router = createRouter({
  routes,
  history: createMemoryHistory()
});

export default router;
