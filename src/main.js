import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyApHhU9ECKedly2D_lBBLnCefY-FovOAlo',
        libraries: 'places', // Adicione outras bibliotecas conforme necessário
    },
});

app.mount('#app')