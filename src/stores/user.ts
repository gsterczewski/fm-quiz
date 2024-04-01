import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const useDarkTheme = ref(false);
  function switchTheme() {
    useDarkTheme.value = !useDarkTheme.value;
  }
  return {
    useDarkTheme,
    switchTheme
  };
});
