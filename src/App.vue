<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div
    class="flex flex-col min-h-screen font-roboto bg-light-background dark:bg-dark-background"
  >
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
:global(::view-transition-old(root)),
:global(::view-transition-new(root)) {
  animation-duration: 600ms;
}
</style>
