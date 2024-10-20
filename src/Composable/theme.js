import { ref } from 'vue';
import { useDark } from '@vueuse/core';

const isDark = ref(useDark());

export function useTheme() {
  return {
    isDark,
  };
}