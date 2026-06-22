<script setup>
import { computed } from 'vue';
import { getIcon } from '../../utils/weatherIcons';

const props = defineProps({
  days: { type: Array, required: true },
  timezone: { type: String, default: 'America/Sao_Paulo' }
});

// ✅ Pega a data de HOJE no fuso horário da CIDADE usando Intl API
const today = computed(() => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: props.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(now); // Retorna "YYYY-MM-DD" no fuso correto
});

// Compara string por string - simples e confiável
const isToday = (day) => {
  return day.date === today.value;
};

// DEBUG temporário
const debug = computed(() => {
  console.log('=== DEBUG ===');
  console.log('Timezone:', props.timezone);
  console.log('Hoje (calculado):', today.value);
  console.log('==============');
  return true;
});
</script>

<template>
  <div class="mx-8 text-light-text dark:text-dark-text">
    <h2 class="mb-4">Previsão de 3 dias</h2>

    <!-- Ativa o debug -->
    <span v-if="debug" class="hidden"></span>

    <div class="flex flex-col gap-4">
      <div
        v-for="day in days"
        :key="day.date_epoch"
        :class="[
          'flex items-center py-2 px-4 border-2 border-solid rounded-2xl transition-all duration-300',
          isToday(day)
            ? 'border-blue-500 dark:border-blue-400 bg-blue-500/10 dark:bg-blue-400/10 shadow-lg shadow-blue-500/20'
            : 'border-[#474747] bg-[#474747]/10'
        ]"
      >
        <div class="flex items-center gap-4">
          <div class="flex flex-col">
            <p class="flex-1 w-[110px] capitalize font-medium">
              {{
                new Date(day.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                  weekday: 'long'
                })
              }}
            </p>
            <p
              v-if="isToday(day)"
              class="text-xs text-blue-500 dark:text-blue-400 font-semibold"
            >
              Hoje
            </p>
          </div>
          <div
            class="h-[50px] w-[50px] [&>svg]:w-full [&>svg]:h-full"
            v-html="getIcon(day.day.condition, true, true)"
          />
        </div>

        <div class="flex flex-1 justify-end gap-2">
          <p>Max: {{ Math.round(day.day.maxtemp_c) }}°C</p>
          <p>Min: {{ Math.round(day.day.mintemp_c) }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>
