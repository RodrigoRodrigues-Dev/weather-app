<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { getIcon } from '../../utils/weatherIcons';

const props = defineProps({
  hours: { type: Array, required: true }
});

// Hora atual reativa (atualiza a cada minuto)
const now = ref(new Date());
let intervalId = null;

// Refs dos cards (array dinâmico)
const hourCards = ref([]);

const currentHour = computed(() => now.value.getHours());

// Verifica se o card representa a hora atual
const isCurrentHour = (hourData) => {
  const cardHour = new Date(hourData.currentTime).getHours();
  return cardHour === currentHour.value;
};

// Rola o scroll até o card da hora atual
const scrollToCurrentHour = async () => {
  await nextTick();

  // Encontra o índice da hora atual
  const currentIndex = props.hours.findIndex((hourData) =>
    isCurrentHour(hourData)
  );

  if (currentIndex !== -1 && hourCards.value[currentIndex]) {
    // Rola suavemente até o card, centralizando-o
    hourCards.value[currentIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
};

// Atualiza a cada minuto para manter o destaque sincronizado
onMounted(() => {
  scrollToCurrentHour(); // Rola até a hora atual ao montar

  intervalId = setInterval(() => {
    now.value = new Date();
    scrollToCurrentHour(); // Rola novamente quando a hora muda
  }, 60000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

// Define a ref do card
const setCardRef = (el, index) => {
  if (el) hourCards.value[index] = el;
};
</script>

<template>
  <div class="mx-8 text-light-text dark:text-dark-text">
    <h2 class="mb-4">Previsão Horária</h2>

    <div class="flex gap-4 overflow-x-scroll pb-[20px]">
      <div
        v-for="(hourData, index) in hours"
        :key="hourData.time_epoch"
        :ref="(el) => setCardRef(el, index)"
        :class="[
          'flex flex-col items-center justify-between gap-2 p-2 border-2 border-solid dark:border-[#474747] dark:bg-[#474747]/10 light:bg-[#fffff]/10 rounded-2xl transition-all duration-300',
          isCurrentHour(hourData)
            ? 'border-blue-500 dark:border-blue-400 dark:bg-blue-400/10'
            : 'border-2 border-solid dark:border-[#474747] dark:bg-[#474747]/10 light:bg-[#fffff]/10'
        ]"
      >
        <p class="whitespace-nowrap text-md">
          {{
            new Date(hourData.currentTime).toLocaleTimeString('pt-BR', {
              hour: 'numeric'
            })
          }}:00
        </p>

        <!-- Indicador "Agora" -->
        <p
          v-if="isCurrentHour(hourData)"
          class="text-xs text-blue-500 dark:text-blue-400 font-semibold"
        >
          Agora
        </p>

        <div
          class="h-[50px] w-[50px] [&>svg]:w-full [&>svg]:h-full"
          v-html="getIcon(hourData.condition, hourData.is_day === 1, true)"
        />

        <p class="text-xl">{{ Math.round(hourData.temp_c) }}°C</p>
      </div>
    </div>
  </div>
</template>
