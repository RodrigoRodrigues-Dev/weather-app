<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MapComponent from './MapComponent.vue';

// Router
const route = useRoute();
const router = useRouter();

// State
const weatherData = ref(null);
const savedCities = ref(
  JSON.parse(localStorage.getItem('savedCities') || '[]')
);

// Verifica se a cidade já está salva
const alreadyExists = savedCities.value.some(
  (city) => city.state === route.params.state && city.city === route.params.city
);

// Buscar dados do clima
const fetchWeatherData = async () => {
  try {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: import.meta.env.VITE_WEATHER_API_KEY,
          q: `${route.query.lat},${route.query.lng}`,
          days: 7,
          aqi: 'no',
          alerts: 'no'
        }
      }
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;

    // Hora local da cidade
    data.currentTime =
      new Date(data.location.localtime).getTime() + localOffset;

    // Ajuste das horas da previsão
    data.forecast.forecastday[0].hour.forEach((hour) => {
      hour.currentTime = new Date(hour.time).getTime() + localOffset;
    });

    weatherData.value = data;
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    weatherData.value = null;
  }
};

// Remover cidade salva
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');

  const updatedCities = cities.filter((city) => city.id != route.query.id);

  localStorage.setItem('savedCities', JSON.stringify(updatedCities));

  router.push({ name: 'home' });
};

// Lifecycle
onMounted(fetchWeatherData);
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Informações atuais -->
    <div
      v-if="weatherData"
      class="flex flex-col items-center py-12 text-light-text dark:text-dark-text"
    >
      <h1 class="mb-2 text-4xl">
        {{ route.params.city }}
      </h1>

      <p class="mb-12 text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: '2-digit',
            month: 'long'
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('pt-BR', {
            timeStyle: 'short'
          })
        }}
      </p>

      <p class="mb-8 text-7xl">
        {{ Math.round(weatherData.current.temp_c) }}°C
      </p>

      <p>
        Sensação térmica de
        {{ Math.round(weatherData.current.feelslike_c) }}°C
      </p>

      <p class="capitalize">
        {{ weatherData.current.condition.text }}
      </p>

      <img
        class="h-auto w-[130px]"
        :src="`https:${weatherData.current.condition.icon}`"
        alt="Condição climática"
      />
    </div>

    <hr
      class="w-full border border-light-text border-opacity-10 dark:border-dark-secondary-text"
    />

    <!-- Previsão horária -->
    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-light-text dark:text-dark-text">
        <h2 class="mb-4">Previsão Horária</h2>

        <div class="flex h-[180px] gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.forecast.forecastday[0].hour"
            :key="hourData.time_epoch"
            class="flex flex-col items-center gap-4"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString('pt-BR', {
                  hour: 'numeric'
                })
              }}:00
            </p>

            <img
              class="h-[50px] w-auto object-cover"
              :src="`https:${hourData.condition.icon}`"
              alt="Ícone do clima"
            />

            <p class="text-xl">{{ Math.round(hourData.temp_c) }}°C</p>
          </div>
        </div>
      </div>
    </div>

    <hr
      class="w-full border border-light-text border-opacity-10 dark:border-dark-secondary-text"
    />

    <!-- Previsão dos próximos dias -->
    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-light-text dark:text-dark-text">
        <h2 class="mb-4">Previsão de 3 dias</h2>

        <div
          v-for="day in weatherData.forecast.forecastday"
          :key="day.date_epoch"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.date).toLocaleDateString('pt-BR', {
                weekday: 'long'
              })
            }}
          </p>

          <img
            class="h-[50px] w-[50px] object-cover"
            :src="`https:${day.day.condition.icon}`"
            alt="Ícone do clima"
          />

          <div class="flex flex-1 justify-end gap-2">
            <p>
              Max:
              {{ Math.round(day.day.maxtemp_c) }}°C
            </p>

            <p>
              Min:
              {{ Math.round(day.day.mintemp_c) }}°C
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mapa -->
    <MapComponent class="my-20" />

    <!-- Remover cidade -->
    <div
      v-if="alreadyExists"
      class="flex cursor-pointer items-center gap-2 py-12 text-light-text duration-150 hover:text-red-400 dark:text-dark-text dark:hover:text-red-400"
      @click="removeCity"
    >
      <i class="bx bxs-trash-alt"></i>
      <p>Remover Cidade</p>
    </div>
  </div>
</template>

<style>
.flex::-webkit-scrollbar {
  height: 8px;
}

.flex::-webkit-scrollbar-thumb {
  background-color: #bbbbbb;
  border-radius: 10px;
}

.flex::-webkit-scrollbar-track {
  background: transparent;
}
</style>
