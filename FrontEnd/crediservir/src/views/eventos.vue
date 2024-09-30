<template>
  <div>
    <h1>Eventos</h1>
    <EventoList />
  </div>
</template>

<script>
import EventosComponent from '../components/EventosComponent.vue'; // Actualiza la importación

const routes = [
  {
    path: '/eventos',
    name: 'EventosComponent', // Actualiza el nombre de la ruta
    component: EventosComponent
  }
];
