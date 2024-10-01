import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import EventosComponent from '../components/EventosComponent.vue';
import AsistentesComponent from '@/components/AsistentesComponent.vue';
import PagosComponent from '@/components/pagosComponent.vue';
import PromocionesComponent from '@/components/PromocionesComponent.vue';
import PanelAdministracion from '@/components/PanelAdministracion.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: EventosComponent,
  },
  {
    path: '/asistentes',
    name: 'Asistentes',
    component: AsistentesComponent,
  },
  {
    path: '/pagos',
    name: 'Pagos',
    component: PagosComponent,
  },
  {
    path: '/promociones',
    name: 'Promociones',
    component: PromocionesComponent,
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: PanelAdministracion,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
