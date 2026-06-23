<script setup>
import { computed } from 'vue';
import { getIcon } from '../../utils/weatherIcons';

const props = defineProps({
  days: { type: Array, required: true },
  timezone: { type: String, default: 'America/Sao_Paulo' }
});

const today = computed(() => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: props.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(now);
});

const isToday = (day) => day.date === today.value;

const getIconCode = (condition) => {
  return condition.icon.match(/\/(\d+)\.png/)?.[1] || '???';
};
</script>

<template>
  <div class="mx-2 md:mx-8 text-light-text dark:text-dark-text">
    <h2 class="mb-4">Previsão de 3 dias</h2>

    <div class="gap-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="day in days"
        :key="day.date_epoch"
        :class="[
          'flex items-center py-2 px-4 border-2 border-solid rounded-2xl transition-all duration-300 flex-col',
          isToday(day)
            ? 'border-blue-500 dark:border-blue-400 dark:bg-blue-400/10'
            : 'border-2 border-solid dark:border-[#474747] dark:bg-[#474747]/10'
        ]"
      >
        <div class="flex items-center gap-4 flex-col-reverse">
          <div class="flex flex-col-reverse">
            <p class="flex justify-center w-[110px] capitalize font-medium">
              {{
                new Date(day.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                  weekday: 'long'
                })
              }}
            </p>

            <!-- Espaço reservado com altura mínima -->
            <div class="h-4 flex justify-center items-center">
              <p
                v-if="isToday(day)"
                class="text-xs text-blue-500 dark:text-blue-400 font-semibold"
              >
                Hoje
              </p>
            </div>
          </div>

          <!-- Ícone com fallback -->
          <div class="h-[50px] w-[50px] flex items-center justify-center">
            <div
              v-if="getIcon(day.day.condition, true, true)"
              class="h-full w-full [&>svg]:w-full [&>svg]:h-full"
              v-html="getIcon(day.day.condition, true, true)"
            />

            <!-- Fallback: mostra imagem da API + código -->
            <div v-else class="flex flex-col items-center">
              <img
                :src="`https:${day.day.condition.icon}`"
                :alt="day.day.condition.text"
                class="h-[50px] w-[50px] opacity-50"
              />
              <span class="text-[10px] text-red-500 font-mono font-bold mt-1">
                #{{ getIconCode(day.day.condition) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 justify-end gap-2">
          <p class="text-xs">Max: {{ Math.round(day.day.maxtemp_c) }}°C</p>
          <p class="text-xs">Min: {{ Math.round(day.day.mintemp_c) }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>
