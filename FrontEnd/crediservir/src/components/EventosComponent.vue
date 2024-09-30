<template>
  <div>
    <h1>Lista de Eventos</h1>
    <form @submit.prevent="addEvento">
      <input v-model="nuevoEvento.titulo" placeholder="Título" required />
      <input v-model="nuevoEvento.fecha" type="date" required />
      <button type="submit">Agregar Evento</button>
    </form>
    <ul>
      <li v-for="evento in eventos" :key="evento.id">
        {{ evento.titulo }} - {{ evento.fecha }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getEventos, createEvento } from '../services/eventosService';

export default {
  name: 'EventosComponent',
  data() {
    return {
      eventos: [],
      nuevoEvento: {
        titulo: '',
        fecha: '',
      },
    };
  },
  async created() {
    await this.fetchEventos();
  },
  methods: {
    async fetchEventos() {
      try {
        this.eventos = await getEventos();
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    },
    async addEvento() {
      try {
        const eventoCreado = await createEvento(this.nuevoEvento);
        this.eventos.push(eventoCreado);
        this.nuevoEvento.titulo = '';
        this.nuevoEvento.fecha = '';
      } catch (error) {
        console.error('Error al agregar evento:', error);
      }
    },
  },
};
</script>
