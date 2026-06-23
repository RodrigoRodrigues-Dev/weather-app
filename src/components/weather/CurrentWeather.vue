<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  weather: { type: Object, required: true },
  gradient: { type: String, required: true },
  icon: { type: [Object, String], default: null }
});

const route = useRoute();

const formattedTime = computed(() => {
  return new Date(props.weather.currentTime).toLocaleTimeString('pt-BR', {
    timeStyle: 'short'
  });
});
const formattedDate = computed(() => {
  return new Date(props.weather.currentTime).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'long'
  });
});
</script>

<template>
  <div
    :class="gradient"
    class="flex flex-col sm:flex-row items-center justify-between rounded-lg py-4 px-4 sm:px-6 md:px-8 mx-2 md:mx-8 text-dark-text gap-4 sm:gap-6"
  >
    <!-- Esquerda: Cidade + Temperatura + Ícone -->
    <div
      class="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-start"
    >
      <div class="flex flex-col">
        <h1 class="mb-1 sm:mb-2 text-2xl sm:text-3xl md:text-4xl font-medium">
          {{ route.params.city }}
        </h1>
        <p class="text-5xl sm:text-6xl md:text-7xl font-light leading-none">
          {{ Math.round(weather.current.temp_c) }}°C
        </p>
        <p class="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
          Sensação térmica de {{ Math.round(weather.current.feelslike_c) }}°C
        </p>
      </div>

      <component
        :is="icon"
        class="h-16 w-16 sm:h-20 sm:w-20 md:h-[100px] md:w-[100px] text-4xl sm:text-5xl md:text-6xl flex-shrink-0"
      />
    </div>

    <!-- Direita: Condição + Data/Hora -->
    <div
      class="flex flex-col items-start sm:items-end text-left sm:text-right w-full sm:w-auto bg-[#ffffff20] rounded-lg py-2 px-4"
    >
      <p class="capitalize text-sm sm:text-base md:text-lg font-medium">
        {{ weather.current.condition.text }}
      </p>
      <div class="flex and items-center gap-1">
        <p class="text-xs sm:text-sm md:text-base">
          {{ formattedTime }}
        </p>
        <p class="text-xs sm:text-sm md:text-base capitalize">
          {{ formattedDate }}
        </p>
      </div>
    </div>
  </div>
</template>
