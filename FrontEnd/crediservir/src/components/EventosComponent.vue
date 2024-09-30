<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Gestión de Eventos</h1>

    <!-- Formulario para crear/editar evento -->
    <form @submit.prevent="submitForm" class="mb-8">
      <input v-model="evento.titulo" class="border p-2 w-full mb-4" placeholder="Título" required />
      <textarea v-model="evento.descripcion" class="border p-2 w-full mb-4" placeholder="Descripción"></textarea>
      <input v-model="evento.fecha" class="border p-2 w-full mb-4" type="date" required />
      <input v-model="evento.hora" class="border p-2 w-full mb-4" type="time" required />
      <input v-model="evento.lugar" class="border p-2 w-full mb-4" placeholder="Lugar" required />
      <input v-model="evento.cupo_disponible" class="border p-2 w-full mb-4" type="number" placeholder="Cupo Disponible" required min="1" />
      <select v-model="evento.tipo" class="border p-2 w-full mb-4" required>
        <option value="gratuito">Gratuito</option>
        <option value="pago">Pago</option>
      </select>
      <input v-model="evento.valor_base" class="border p-2 w-full mb-4" type="number" placeholder="Valor Base" v-if="evento.tipo === 'pago'" min="1" />
      <input v-model="evento.categorias" class="border p-2 w-full mb-4" placeholder="Categorías (separadas por comas)" />
      <input v-model="evento.fecha_apertura" class="border p-2 w-full mb-4" type="date" placeholder="Fecha de Apertura Inscripción" required />
      <input v-model="evento.fecha_cierre" class="border p-2 w-full mb-4" type="date" placeholder="Fecha de Cierre Inscripción" required />

      <!-- Mostrar mensaje de error si la validación falla -->
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Guardar Evento</button>
    </form>

    <!-- Lista de eventos -->
    <ul>
      <li v-for="evento in eventos" :key="evento.id" class="bg-white shadow-md rounded p-4 mb-4">
        <h3 class="text-xl font-bold">{{ evento.titulo }}</h3>
        <p><strong>Descripción:</strong> {{ evento.descripcion }}</p>
        <p><strong>Fecha:</strong> {{ evento.fecha }} <strong>Hora:</strong> {{ evento.hora }}</p>
        <p><strong>Lugar:</strong> {{ evento.lugar }}</p>
        <p><strong>Cupo Disponible:</strong> {{ evento.cupo_disponible }}</p>
        <p><strong>Tipo:</strong> {{ evento.tipo }}</p>
        <p v-if="evento.tipo === 'pago'"><strong>Valor Base:</strong> {{ evento.valor_base }}</p>
        <p><strong>Categorías:</strong> {{ evento.categorias }}</p>
        
        <button @click="editEvento(evento)" class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">Editar</button>
        <button @click="deleteEvento(evento.id)" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Eliminar</button>
      </li>
    </ul>
  </div>
</template>



<script>
import { getEventos, createEvento, updateEvento, deleteEvento } from '../services/eventosService';

export default {
  name: 'EventosComponent',
  data() {
    return {
      eventos: [],
      evento: {
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        cupo_disponible: 0,
        tipo: 'gratuito',
        valor_base: 0,
        categorias: '',
        fecha_apertura: '',
        fecha_cierre: '',
      },
      isEditing: false,
      eventoId: null, // Para saber si estamos editando
      errorMessage: '', // Para mostrar mensajes de error
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
    async submitForm() {
      const fechaApertura = new Date(this.evento.fecha_apertura);
      const fechaCierre = new Date(this.evento.fecha_cierre);
      const fechaEvento = new Date(this.evento.fecha);

      // Validación 1: La fecha de cierre no puede ser menor que la fecha de apertura
      if (fechaCierre < fechaApertura) {
        this.errorMessage = 'La fecha de cierre no puede ser menor que la fecha de apertura';
        return;
      }

      // Validación 2: Las fechas de apertura y cierre deben ser menores que la fecha del evento
      if (fechaApertura >= fechaEvento) {
        this.errorMessage = 'La fecha de apertura debe ser menor que la fecha del evento';
        return;
      }

      if (fechaCierre >= fechaEvento) {
        this.errorMessage = 'La fecha de cierre debe ser menor que la fecha del evento';
        return;
      }

      // Preparar datos del evento antes de enviarlos
      const eventoData = { ...this.evento };

      // Si el evento es gratuito, eliminar o establecer en null el valor_base
      if (eventoData.tipo === 'gratuito') {
        eventoData.valor_base = null; // O eliminar el campo: delete eventoData.valor_base;
      }

      // Si las validaciones pasan, limpiar el mensaje de error
      this.errorMessage = '';

      try {
        if (this.isEditing) {
          // Editar evento
          await updateEvento(this.eventoId, eventoData);
        } else {
          // Crear nuevo evento
          await createEvento(eventoData);
        }
        await this.fetchEventos();
        this.resetForm();
      } catch (error) {
        console.error('Error al guardar el evento:', error);
        this.errorMessage = 'Hubo un error al guardar el evento. Revisa los datos e inténtalo de nuevo.';
      }
    },
    editEvento(evento) {
      this.evento = { ...evento };
      this.eventoId = evento.id;
      this.isEditing = true;
    },
    async deleteEvento(id) {
      try {
        await deleteEvento(id);
        await this.fetchEventos();
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        this.errorMessage = 'No se pudo eliminar el evento. Puede estar relacionado con otros datos.';
      }
    },
    resetForm() {
      this.evento = {
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        cupo_disponible: 0,
        tipo: 'gratuito',
        valor_base: 0,
        categorias: '',
        fecha_apertura: '',
        fecha_cierre: '',
      };
      this.isEditing = false;
      this.eventoId = null;
      this.errorMessage = ''; // Limpiar el mensaje de error al resetear el formulario
    },
  },
};
</script>
