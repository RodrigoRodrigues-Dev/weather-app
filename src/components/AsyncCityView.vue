<script setup>
import { useWeatherData } from '../Composables/useWeatherData';
import { useSavedCities } from '../Composables/useSavedCities';

import CurrentWeather from './weather/CurrentWeather.vue';
import WeatherDetails from './weather/WeatherDetails.vue';
import HourlyForecast from './weather/HourlyForecast.vue';
import DailyForecast from './weather/DailyForecast.vue';
import RemoveCityButton from './weather/RemoveCityButton.vue';
import MapComponent from './MapComponent.vue';

const { weatherData, currentGradient, currentIcon, loading } = useWeatherData();
const { alreadyExists, removeCity } = useSavedCities();
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- SKELETON LOADING -->
    <div v-if="loading" class="w-full max-w-screen-lg my-4 space-y-8 px-4">
      <div
        class="h-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
      ></div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="i in 5"
          :key="i"
          class="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
        ></div>
      </div>

      <div class="flex gap-4 overflow-hidden">
        <div
          v-for="i in 8"
          :key="i"
          class="h-32 w-20 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
        ></div>
      </div>

      <div class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
        ></div>
      </div>
    </div>

    <!-- CONTEÚDO REAL -->
    <template v-else-if="weatherData">
      <div class="max-w-screen-lg w-full my-4">
        <CurrentWeather
          :weather="weatherData"
          :gradient="currentGradient"
          :icon="currentIcon"
        />
      </div>

      <hr
        class="w-full border border-light-text border-opacity-10 dark:border-[#474747]"
      />

      <div class="max-w-screen-lg w-full my-8">
        <WeatherDetails :current="weatherData.current" />
      </div>

      <hr
        class="w-full border border-light-text border-opacity-10 dark:border-[#474747]"
      />

      <div class="max-w-screen-lg w-full my-12">
        <HourlyForecast :hours="weatherData.forecast.forecastday[0].hour" />
      </div>

      <hr
        class="w-full border border-light-text border-opacity-10 dark:border-[#474747]"
      />

      <div class="max-w-screen-lg w-full my-12">
        <DailyForecast
          :days="weatherData.forecast.forecastday"
          :current-time="weatherData.currentTime"
        />
      </div>

      <MapComponent class="mt-10" />

      <RemoveCityButton :visible="alreadyExists" @remove="removeCity" />
    </template>
  </div>
</template>

<style>
/* Scrollbar da previsão horária */
.flex::-webkit-scrollbar {
  height: 8px;
}

.flex::-webkit-scrollbar-thumb {
  background-color: rgba(187, 187, 187, 0.5); /* Cinza semi-transparente */
  border-radius: 10px;
}

.flex::-webkit-scrollbar-track {
  background: transparent; /* Track transparente */
}

/* Firefox */
.flex {
  scrollbar-width: thin;
  scrollbar-color: rgba(187, 187, 187, 0.5) transparent;
}
</style>
