<script setup>
defineProps({
  visible: { type: Boolean, default: false }
});

const emit = defineEmits(['remove']);
</script>

<template>
  <div
    v-if="visible"
    class="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-3xl border-2 border-solid border-[#474747] my-8 text-light-text duration-150 hover:bg-red-400/10 hover:text-red-400 dark:text-dark-text dark:hover:text-red-400"
    @click="emit('remove')"
  >
    <i class="bx bxs-trash-alt"></i>
    <p>Remover Cidade</p>
  </div>
</template>
