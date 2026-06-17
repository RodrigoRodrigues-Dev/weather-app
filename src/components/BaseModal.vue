<script setup>
import { watch } from 'vue';

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
});

watch(
  () => props.modalActive,
  (newVal) => {
    if (newVal) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<template>
  <div
    v-show="modalActive"
    class="z-50 absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center items-center px-8"
  >
    <div
      v-if="modalActive"
      class="p-4 bg-light-background dark:bg-dark-background mt-32 max-w-screen-md rounded-md"
    >
      <slot />
      <button
        class="text-white mt-8 bg-light-secondary-text rounded-md py-2 px-6"
        @click="$emit('close-modal')"
      >
        Fechar
      </button>
    </div>
  </div>
</template>
