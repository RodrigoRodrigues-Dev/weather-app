import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);

app.use(router);

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_API_GOOGLE_KEY,
    libraries: 'places'
  }
});

app.mount('#app');
