<script setup lang="ts">
import VueCard from '@components/VueCard.vue';
import VueTile from '@components/VueTile.vue';

type QuizOptionProps = {
  answer: string;
  inputValue: string;
  inputName: string;
  answerIndex: string;
  hasSuccess?: boolean;
  hasError?: boolean;
  showSuccessIcon?: boolean;
};

const model = defineModel();
defineProps<QuizOptionProps>();
</script>

<template>
  <label class="radio" :class="{ 'radio--success': hasSuccess, 'radio--error': hasError }">
    <input class="radio-input" type="radio" :name="inputName" :value="inputValue" v-model="model" :disabled="hasError || hasSuccess" />
    <VueCard class="radio-card">
      <VueTile class="radio-tile">
        <p>{{ answerIndex }}</p>
      </VueTile>
      <div class="w-full flex justify-between">
        <p class="text-lg md:text-3xl font-medium text-blue-900">{{ answer }}</p>
        <img v-if="hasSuccess || showSuccessIcon" src="/icon-correct.svg" class="w-6 aspect-square md:w-8" />
        <img v-if="hasError" src="/icon-error.svg" class="w-6 aspect-square md:w-8" />
      </div>
    </VueCard>
  </label>
</template>

<style scoped>
.radio {
  --card-border-clr: transparent;
  --tile-bg: var(--clr-gray-100);
  --tile-text: var(--clr-gray-500);
}
.radio-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  cursor: pointer;
}
.radio-card {
  border: 2px solid var(--card-border-clr);
}
.radio-card,
.radio-tile {
  transition: all 0.5s ease;
}
.radio-tile {
  background-color: var(--tile-bg);
  color: var(--tile-text);
}

.radio:has(:hover, :checked, .radio-input:focus) {
  --card-border-clr: var(--clr-purple-500);
  --tile-bg: var(--clr-purple-500);
  --tile-text: white;
}
.radio:has(.radio-input:disabled) {
  pointer-events: none;
}
.radio--success {
  --card-border-clr: var(--clr-green-500);
  --tile-bg: var(--clr-green-500);
  --tile-text: white;
}
.radio--error {
  --card-border-clr: var(--clr-red-500);
  --tile-bg: var(--clr-red-500);
  --tile-text: white;
}
</style>
