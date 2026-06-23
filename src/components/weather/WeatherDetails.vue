<script setup>
import { metricIcons } from '../../utils/weatherIcons';

const props = defineProps({
  current: { type: Object, required: true }
});

const details = computed(() => [
  {
    key: 'humidity',
    label: 'Umidade',
    value: `${props.current.humidity}%`,
    icon: metricIcons.humidity
  },
  {
    key: 'wind',
    label: 'km/h vento',
    value: Math.round(props.current.wind_kph),
    icon: metricIcons.wind
  },
  {
    key: 'visibility',
    label: 'km visibilidade',
    value: props.current.vis_km,
    icon: metricIcons.visibility
  },
  {
    key: 'uv',
    label: 'índice UV',
    value: props.current.uv,
    icon: metricIcons.uv
  },
  {
    key: 'pressure',
    label: 'mb pressão',
    value: Math.round(props.current.pressure_mb),
    icon: metricIcons.pressure
  }
]);
</script>

<script>
import { computed } from 'vue';
</script>

<template>
  <div class="mx-2 md:mx-8 text-light-text dark:text-dark-text">
    <h2 class="mb-4">Detalhes do Clima</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="detail in details"
        :key="detail.key"
        class="flex flex-col items-center p-4 border-2 border-solid dark:border-[#474747] dark:bg-[#474747]/10 rounded-2xl"
      >
        <div class="h-10 w-full flex justify-center mb-4">
          <div
            class="h-[50px] w-[50px] [&>svg]:w-full [&>svg]:h-full"
            v-html="detail.icon"
          />
        </div>
        <p class="text-2xl font-bold">{{ detail.value }}</p>
        <p class="text-sm text-gray-400">{{ detail.label }}</p>
      </div>
    </div>
  </div>
</template>
