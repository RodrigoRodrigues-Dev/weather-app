<script setup>
import { ref } from 'vue';
import { uid } from 'uid';
import { useTheme } from '../Composable/theme.js';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';

const { isDark } = useTheme();
const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <header class="sticky top-0 bg-light-background dark:bg-dark-background shadow-md dark:shadow-custom-dark">
    <nav
      class="container flex flex-col sm:flex-row justify-between items-center gap-4 text-light-text py-6  dark:text-dark-text">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex justify-center items-center">
          <img class="w-12 mr-4" src="/favicon.png" alt="Weather App Logo">
          <h1 class="text-xl font-black">Weather App</h1>
        </div>
      </RouterLink>
      <div class="flex justify-center items-center gap-6">
        <RouterLink :to="{ name: 'home' }" class="flex justify-center items-center cursor-pointer">
          <i class="bx bx-search-alt text-2xl"></i>
          <span class="text-lg ml-2">Buscar</span>
        </RouterLink>
        <div class="flex">
          <div class="mr-3 text-2xl flex items-center">
            <i v-if="isDark" class='bx bx-moon'></i>
            <i v-else class='bx bx-sun'></i>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input v-model="isDark" type="checkbox" class="sr-only peer" :checked="isDark">
            <div class="relative w-11 h-6 peer-focus:outline-none 
              bg-light-pink-switch peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
              after:bg-white after:border after:border-gray-300 after:rounded-full 
              after:h-5 after:w-5 after:transition-all dark:border-light-pink-switch
              peer-checked:bg-dark-pink-switch rounded-full">
            </div>
          </label>
        </div>
        <div class="text-2xl flex gap-2">
          <i 
            class='bx bxs-info-circle hover:text-light-secondary-text'
            @click="toggleModal"
          ></i>
          <i 
            class='bx bx-plus cursor-pointer hover:text-light-secondary-text'
            @click="addCity"
            
          ></i>
        </div>
      </div>
      <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
        <div>
          <h1 class="text-2xl mb-2">Sobre</h1>
          <p class="mb-4">
            O Clima Local permite que você acompanhe o clima atual e
            futuro das cidades de sua escolha.
          </p>
          <h2 class="text-2xl mb-2">Como funciona</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Pesquise sua cidade digitando o nome na barra de busca.
            </li>
            <li>
              Selecione uma cidade nos resultados, isso levará
              você ao clima atual da sua seleção.
            </li>
            <li>
              Acompanhe a cidade clicando no ícone "+" no canto
              superior direito. Isso salvará a cidade para visualização
              posterior na página inicial.
            </li>
          </ol>

          <h2 class="text-2xl mb-2">Removendo uma cidade</h2>
          <p>
            Se você não deseja mais acompanhar uma cidade, basta
            selecioná-la na página inicial. Na parte inferior da
            página, haverá uma opção para excluir a cidade.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>