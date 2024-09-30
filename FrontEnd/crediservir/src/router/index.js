import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import EventosComponent from '../components/EventosComponent.vue'; // Asegúrate de que el nombre y la ruta sean correctos

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: EventosComponent, // Asegúrate de usar el nuevo nombre aquí
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
