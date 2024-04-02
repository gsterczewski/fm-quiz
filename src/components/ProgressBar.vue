<script setup lang="ts">
import { computed } from 'vue';
type ProgressBarProps = {
  min?: number;
  max: number;
  value: number;
};
const props = withDefaults(defineProps<ProgressBarProps>(), {
  min: 0
});
const progressFillWidth = computed(() => `${Math.round((props.value / props.max) * 100)}%`);
</script>
<template>
  <div class="progress-bar" role="progressbar" :aria-valuenow="value" :aria-valuemin="min" :aria-valuemax="max">
    <div class="progress-fill" :style="{ width: progressFillWidth }"></div>
  </div>
</template>
<style scoped>
.progress-bar {
  --border-radius: 8px;
  --fill-color: var(--clr-purple-500, #de41f3);
  --background-color: white;

  height: 100%;
  width: 100%;
  border-radius: var(--border-radius);
  padding: 0.25rem;
  background-color: var(--background-color);
}
.progress-fill {
  height: 100%;
  border-radius: var(--border-radius);
  transition: width 0.5s ease-in-out;
  background-color: var(--fill-color);
}
</style>
