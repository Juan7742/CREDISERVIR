import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '/src/styles/index.css'; // Importa el archivo CSS de Tailwind

createApp(App)
  .use(router)
  .mount('#app');