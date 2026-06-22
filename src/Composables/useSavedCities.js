import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useSavedCities() {
  const route = useRoute();
  const router = useRouter();

  const savedCities = ref(
    JSON.parse(localStorage.getItem('savedCities') || '[]')
  );

  const alreadyExists = savedCities.value.some(
    (city) =>
      city.state === route.params.state && city.city === route.params.city
  );

  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');
    const updatedCities = cities.filter((city) => city.id != route.query.id);
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    router.push({ name: 'home' });
  };

  return { savedCities, alreadyExists, removeCity };
}
