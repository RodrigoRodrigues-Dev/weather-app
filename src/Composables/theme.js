import { useDark } from '@vueuse/core';

const isDark = useDark();

export function useTheme() {
  function toggleTheme(event) {
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    if (!document.startViewTransition) {
      isDark.value = !isDark.value;
      return;
    }

    document.startViewTransition(() => {
      isDark.value = !isDark.value;
    });
  }

  return {
    isDark,
    toggleTheme
  };
}
