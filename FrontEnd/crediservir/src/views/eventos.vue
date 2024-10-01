<template>
  <div>
    <h1>Eventos</h1>
    <EventoList />
  </div>
</template>

<script>
import EventosComponent from '../components/EventosComponent.vue';

const routes = [
  {
    path: '/eventos',
    name: 'EventosComponent',
    component: EventosComponent
  }
];
