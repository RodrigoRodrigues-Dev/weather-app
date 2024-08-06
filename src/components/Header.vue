<script setup>
import { useDark } from '@vueuse/core';
import { RouterLink } from 'vue-router';

const isDark = useDark();
</script>

<template>
  <header class="sticky top-0 bg-light-background dark:bg-dark-background shadow-md dark:shadow-custom-dark">
    <nav class="container flex flex-col sm:flex-row justify-between items-center gap-4 text-light-text py-6  dark:text-dark-text">
      <div class="flex justify-center items-center">
        <img class="w-12 mr-4" src="/favicon.png" alt="Weather App Logo">
        <h1 class="text-xl font-black">Weather App</h1>
      </div>
      <div class="flex justify-center items-center">
        <RouterLink :to="{ name: 'home' }" class="flex cursor-pointer">
          <i class="bx bx-search-alt text-2xl"></i>
          <span class="text-lg ml-2">Buscar</span>
        </RouterLink>
        <div class="ml-10">
          <label class="inline-flex items-center cursor-pointer">
            <input v-model="isDark" type="checkbox" class="sr-only peer" :checked="isDark">
            <div
              class="relative w-11 h-6 peer-focus:outline-none 
              bg-light-pink-switch peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
              after:bg-white after:border after:border-gray-300 after:rounded-full 
              after:h-5 after:w-5 after:transition-all dark:border-light-pink-switch
              peer-checked:bg-dark-pink-switch rounded-full">
            </div>
          </label>
        </div>
      </div>
    </nav>
  </header>
</template>