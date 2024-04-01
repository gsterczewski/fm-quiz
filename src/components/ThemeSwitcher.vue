<script setup lang="ts">
import { ref } from 'vue';

const switchedOn = ref(false);

type ThemeSwitcherProps = {
  handleSwitch: () => void;
};
const props = defineProps<ThemeSwitcherProps>();
function switchState() {
  switchedOn.value = !switchedOn.value;
  props.handleSwitch();
}
</script>
<template>
  <button class="switcher" @click="switchState">
    <span class="switcher-circle" :class="{ 'slide-right': switchedOn }"></span>
  </button>
</template>

<style scoped>
.switcher {
  --circle-height: 0.75rem;
  --switcher-height: 1.25rem;
  --switcher-width: 2rem;

  position: relative;
  width: var(--switcher-width);
  height: var(--switcher-height);
  border-radius: 1rem;
  background-color: var(--clr-purple-500);
}
.switcher-circle {
  position: absolute;
  display: block;
  height: var(--circle-height);
  aspect-ratio: 1/1;
  border-radius: 50%;
  left: 4px;
  top: calc(var(--switcher-height) / 2 - var(--circle-height) / 2);
  background-color: white;
  transition: all 0.35s ease-out;
}
.slide-right {
  transform: translate(100%);
}
@media (min-width: 768px) {
  .switcher {
    --circle-height: 1.25rem;
    --switcher-width: 3rem;
    --switcher-height: 1.75rem;
  }
}
</style>
