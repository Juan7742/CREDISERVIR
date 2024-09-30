import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import EventosComponent from '../components/EventosComponent.vue';
import AsistentesComponent from '@/components/AsistentesComponent.vue';

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
  {
    path: '/asistentes',
    name: 'Asistentes',
    component: AsistentesComponent,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
