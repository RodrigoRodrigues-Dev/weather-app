<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&lang=pt&units=imperial`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'));
  const updatedCities = cities.filter((city) => city.id != route.query.id);
  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-light-text dark:text-dark-text py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "pt-br",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "pt-br",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-7xl mb-8">
        {{ Math.round((weatherData.current.temp - 32) / 1.8) }}&deg;C
      </p>
      <p>
        Sensação térmica de
        {{ Math.round((weatherData.current.temp - 32) / 1.8) }} &deg;C
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[130px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt=""
      />
    </div>
    <hr class="border-light-text dark:border-dark-secondary-text border-opacity-10 border w-full" />
    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-light-text dark:text-dark-text">
          <h2 class="mb-4">Previsão Horária</h2>
          <div class="flex gap-10 overflow-x-scroll h-[180px]">
            <div 
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
            >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("pt-br", {
                  hour: "numeric",
                })
              }}:00
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ Math.round((hourData.temp - 32) / 1.8) }}&deg;C
            </p>
            </div>
          </div>
        </div>
    </div>
    <hr class="border-light-text dark:border-dark-secondary-text border-opacity-10 border w-full" />
    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-light-text dark:text-dark-text">
        <h2 class="mb-4">Previsão de 7 dias</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "pt-br",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Max: {{ Math.round((day.temp.max - 32) / 1.8) }}°C</p>
            <p>Min: {{ Math.round((day.temp.min - 32) / 1.8) }}°C</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 py-12 text-light-text dark:text-dark-text cursor-pointer duration-150 
      hover:text-red-400 dark:hover:text-red-400"
      @click="removeCity"
    >
      <i class='bx bxs-trash-alt'></i>
      <p>Remover Cidade</p>
    </div>
  </div>
</template>

<style>
.flex::-webkit-scrollbar {
  height: 8px;
}

.flex::-webkit-scrollbar-thumb {
  background-color: #BBBBBB;
  border-radius: 10px;
}

.flex::-webkit-scrollbar-track {
  background: transparent;
}
</style>