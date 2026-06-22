import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { getIcon } from '../utils/weatherIcons';
import { getWeatherGradient } from '../utils/weatherGradients';

export function useWeatherData() {
  const route = useRoute();
  const weatherData = ref(null);
  const loading = ref(true); // ✅ Garantir que está aqui
  const error = ref(null);

  const currentGradient = computed(() => {
    if (!weatherData.value)
      return 'bg-gradient-to-br from-[#ff5733] to-[#00d4ff]';
    return getWeatherGradient(weatherData.value.current.condition);
  });

  const currentIcon = computed(() => {
    if (!weatherData.value) return null;
    const { condition, is_day } = weatherData.value.current;
    return getIcon(condition, is_day === 1, false);
  });

  const fetchWeatherData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json`,
        {
          params: {
            key: import.meta.env.VITE_WEATHER_API_KEY,
            q: `${route.query.lat},${route.query.lng}`,
            days: 7,
            lang: 'pt',
            aqi: 'no',
            alerts: 'no'
          }
        }
      );

      data.currentTime = new Date(data.location.localtime).getTime();
      data.forecast.forecastday[0].hour.forEach((hour) => {
        hour.currentTime = new Date(hour.time).getTime();
      });

      weatherData.value = data;
    } catch (err) {
      console.error('Erro ao buscar clima:', err);
      error.value = err;
      weatherData.value = null;
    } finally {
      loading.value = false; // ✅ Garantir que está aqui
    }
  };

  onMounted(fetchWeatherData);

  return {
    weatherData,
    loading,
    error,
    currentGradient,
    currentIcon,
    timezone: computed(
      () => weatherData.value?.location?.timezone || 'America/Sao_Paulo'
    ),
    refresh: fetchWeatherData
  };
}
