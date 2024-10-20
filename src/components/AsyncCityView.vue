<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MapComponent from "./MapComponent.vue";

const route = useRoute();
const router = useRouter();
const weatherData = ref(null);

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${route.query.lat},${route.query.lng}&days=7&aqi=no&alerts=no`
    );

    const data = response.data;
    
    // Calcular a data e hora local
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = new Date(data.location.localtime).getTime();
    data.currentTime = utc + localOffset;
    
    // Calcular a previsão horária com base no fuso horário
    data.forecast.forecastday[0].hour.forEach((hour) => {
      const hourUtc = new Date(hour.time).getTime();
      hour.currentTime = hourUtc + localOffset;
    });

    weatherData.value = data;
  } catch (err) {
    console.error(err);
    weatherData.value = null;
  }
};

onMounted(() => {
  fetchWeatherData();
});

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id != route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "home" });
};
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="weatherData" class="flex flex-col items-center text-light-text dark:text-dark-text py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("pt-br", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("pt-br", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-7xl mb-8">{{ Math.round(weatherData.current.temp_c) }}&deg;C</p>
      <p>
        Sensação térmica de {{ Math.round(weatherData.current.feelslike_c) }} &deg;C
      </p>
      <p class="capitalize">{{ weatherData.current.condition.text }}</p>
      <img class="w-[130px] h-auto" :src="`https:${weatherData.current.condition.icon}`" alt="" />
    </div>

    <hr class="border-light-text dark:border-dark-secondary-text border-opacity-10 border w-full" />

    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-light-text dark:text-dark-text">
        <h2 class="mb-4">Previsão Horária</h2>
        <div class="flex gap-10 overflow-x-scroll h-[180px]">
          <div v-for="hourData in weatherData.forecast.forecastday[0].hour" :key="hourData.time_epoch" class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("pt-br", {
                  hour: "numeric",
                })
              }}:00
            </p>
            <img class="w-auto h-[50px] object-cover" :src="`https:${hourData.condition.icon}`" alt="" />
            <p class="text-xl">{{ Math.round(hourData.temp_c) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-light-text dark:border-dark-secondary-text border-opacity-10 border w-full" />

    <div v-if="weatherData" class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-light-text dark:text-dark-text">
        <h2 class="mb-4">Previsão de 3 dias</h2>
        <div v-for="day in weatherData.forecast.forecastday" :key="day.date_epoch" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(day.date).toLocaleDateString("pt-br", {
                weekday: "long",
              })
            }}
          </p>
          <img class="w-[50px] h-[50px] object-cover" :src="`https:${day.day.condition.icon}`" alt="" />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Max: {{ Math.round(day.day.maxtemp_c) }}°C</p>
            <p>Min: {{ Math.round(day.day.mintemp_c) }}°C</p>
          </div>
        </div>
      </div>
    </div>

    <MapComponent class="my-20"/>

    <div
      class="flex items-center gap-2 py-12 text-light-text dark:text-dark-text cursor-pointer duration-150 hover:text-red-400 dark:hover:text-red-400"
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