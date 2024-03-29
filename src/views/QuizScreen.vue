<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuizzesStore } from '@stores/quizzes';
import CaptionText from '@components/CaptionText.vue';
import VueCard from '@components/VueCard.vue';
import VueTile from '@components/VueTile.vue';
import HeroButton from '@components/HeroButton.vue';
const ANSWER_INDEXES = ['A', 'B', 'C', 'D'];
const route = useRoute();
const { getQuizz } = useQuizzesStore();
const quizKey = route.params.key;
const quiz = getQuizz(quizKey as string);
const currentQuestionIndex = ref(5);
const currentQuestion = computed(() => quiz?.questions[currentQuestionIndex.value]);
const totalQuestions = computed(() => quiz?.questions.length);
</script>
<template>
  <main>
    <div v-if="quiz" class="max-w-6xl mx-auto px-6 md:px-16 flex flex-col gap-10 md:gap-16 xl:flex-row xl:gap-0 xl:px-0">
      <div class="flex-1">
        <CaptionText class="mb-3 md:mb-7">{{ `Question ${currentQuestionIndex + 1} of ${totalQuestions}` }}</CaptionText>
        <p class="xl:max-w-md text-blue-900 font-medium text-xl md:text-4xl">{{ currentQuestion?.question }}</p>
      </div>
      <div class="flex-1">
        <form>
          <label class="block custom-radio-label mb-3" v-for="(option, index) in currentQuestion?.options" :key="index" :for="`answer-${index + 1}`">
            <input class="custom-radio" type="radio" :id="`answer-${index + 1}`" name="answer" :value="option" />
            <VueCard class="custom-radio-card border-2" :text="option">
              <VueTile class="custom-radio-tile">{{ ANSWER_INDEXES[index] || index + 1 }}</VueTile>
            </VueCard>
          </label>
          <HeroButton type="submit" @click.prevent="">Submit Answer</HeroButton>
        </form>
      </div>
    </div>
    <div v-else>
      <h1>Sorry something went wrong</h1>
      <RouterLink to="/" class="hover:text-blue-400 hover:underline">Go back to home page</RouterLink>
    </div>
  </main>
</template>
<style scoped>
.custom-radio {
  @apply absolute opacity-0 cursor-pointer h-0 w-0;
}
.custom-radio-card,
.custom-radio-tile {
  @apply transition-all;
}
.custom-radio-label:hover .custom-radio-card {
  @apply border-purple-500;
}
.custom-radio-label:hover .custom-radio-card > .custom-radio-tile {
  @apply bg-purple-500 text-white;
}
.custom-radio:focus ~ .custom-radio-card {
  @apply border-purple-500;
}
.custom-radio:focus ~ .custom-radio-card > .custom-radio-tile {
  @apply bg-purple-500 text-white;
}
</style>
