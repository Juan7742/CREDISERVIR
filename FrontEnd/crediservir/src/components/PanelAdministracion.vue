<template>
    <div class="max-w-4xl mx-auto py-8 px-8">
      <h1 class="text-3xl font-bold mb-6">Panel de Administración para Organizadores</h1>
  
      <!-- Sección de Eventos -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Eventos Disponibles</h2>
  
        <!-- Lista de eventos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="evento in eventos" :key="evento.id" class="bg-white shadow-md rounded p-4">
            <h3 class="text-xl font-bold">{{ evento.titulo }}</h3>
            <p class="pt-2"><strong>Descripción:</strong> {{ evento.descripcion }}</p>
            <p class="pt-1"><strong>Fecha:</strong> {{ evento.fecha }} <strong>Hora:</strong> {{ evento.hora }}</p>
            <p class="pt-1"><strong>Lugar:</strong> {{ evento.lugar }}</p>
            <p class="pt-1"><strong>Cupo Disponible:</strong> {{ evento.cupo_disponible }}</p>
            <p class="pt-1"><strong>Tipo:</strong> {{ evento.tipo }}</p>
            <p class="pt-1" v-if="evento.tipo === 'pago'"><strong>Valor Base:</strong> {{ evento.valor_base }}</p>
            <p class="pt-1"><strong>Categorías:</strong> {{ evento.categorias }}</p>
          </div>
        </div>
      </section>
  
      <!-- Sección de Asistentes -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Asistentes</h2>
  
        <!-- Filtro de búsqueda -->
        <div class="mb-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar por nombre o apellido"
            class="border p-2 w-full"
          />
        </div>
  
        <!-- Lista de asistentes filtrados -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="asistente in filteredAsistentes"
            :key="asistente.id"
            class="bg-white shadow-md rounded p-4"
          >
            <h3 class="text-xl font-bold">{{ asistente.nombre }} {{ asistente.apellido }}</h3>
            <p class="pt-1"><strong>Fecha de Nacimiento:</strong> {{ asistente.fecha_nacimiento }}</p>
            <p class="pt-2"><strong>Email:</strong> {{ asistente.email }}</p>
            <p class="pt-1"><strong>Celular:</strong> {{ asistente.celular }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { getEventos } from '../services/eventosService';
  import { getAsistentes } from '../services/asistentesService';
  
  export default {
    name: 'PanelAdministracion',
    data() {
      return {
        eventos: [],
        asistentes: [],
        searchQuery: '', // Variable para el filtro de búsqueda
      };
    },
    async created() {
      await this.fetchEventos();
      await this.fetchAsistentes();
    },
    computed: {
      // Computed property para filtrar asistentes
      filteredAsistentes() {
        return this.asistentes.filter(asistente => {
          const fullName = `${asistente.nombre} ${asistente.apellido}`.toLowerCase();
          return fullName.includes(this.searchQuery.toLowerCase());
        });
      },
    },
    methods: {
      async fetchEventos() {
        try {
          this.eventos = await getEventos();
        } catch (error) {
          console.error('Error al obtener eventos:', error);
        }
      },
      async fetchAsistentes() {
        try {
          this.asistentes = await getAsistentes();
        } catch (error) {
          console.error('Error al obtener asistentes:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados aquí */
  </style>
  