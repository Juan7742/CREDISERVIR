<template>
  <div class="max-w-4xl mx-auto py-8 px-8">
    <h1 class="text-3xl font-bold mb-6">Gestión de Eventos</h1>

    <!-- Formulario para crear/editar evento -->
    <form @submit.prevent="submitForm" class="mb-8" ref="eventoForm">
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Título:
        </label>
        <input v-model="evento.titulo" class="border p-2 w-full mb-4" placeholder="Título" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Descripción:
        </label>
        <textarea v-model="evento.descripcion" class="border p-2 w-full mb-4" placeholder="Descripción"></textarea>
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Fecha de realización:
        </label>
        <input v-model="evento.fecha" class="border p-2 w-full mb-4" type="date" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Hora:
        </label>
        <input v-model="evento.hora" class="border p-2 w-full mb-4" type="time" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Lugar:
        </label>
        <input v-model="evento.lugar" class="border p-2 w-full mb-4" placeholder="Lugar" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Cupos disponibles:
        </label>
        <input v-model="evento.cupo_disponible" class="border p-2 w-full mb-4" type="number"
          placeholder="Cupo Disponible" required min="1" />
      </div>

      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Tipo:
        </label>
        <select v-model="evento.tipo" class="border p-2 w-full mb-4" required>
          <option value="gratuito">Gratuito</option>
          <option value="pago">Pago</option>
        </select>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name"
          v-if="evento.tipo === 'pago'">
          Precio:
        </label>
        <input v-model="evento.valor_base" class="border p-2 w-full mb-4" type="number" placeholder="Valor Base"
          v-if="evento.tipo === 'pago'" min="1" />
      </div>

      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Categorías (separadas por comas):
        </label>
        <input v-model="evento.categorias" class="border p-2 w-full mb-4"
          placeholder="Tecnología, IoT, backend, frontend..." />
      </div>

      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Fecha de apertura para Inscripciónes:
        </label>
        <input v-model="evento.fecha_apertura" class="border p-2 w-full mb-4" type="date"
          placeholder="Fecha de Apertura Inscripción" required />
      </div>

      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="inline-full-name">
          Fecha de cierre para Inscripciónes:
        </label>
        <input v-model="evento.fecha_cierre" class="border p-2 w-full mb-4" type="date"
          placeholder="Fecha de Cierre Inscripción" required />
      </div>

      <!-- Mostrar mensaje de error si la validación falla -->
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Guardar Evento</button>
    </form>

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

        <div class="pt-2">
          <button @click="editEvento(evento)"
            class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">Editar</button>
          <button @click="deleteEvento(evento.id)"
            class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    </div>
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
      eventoId: null,
      errorMessage: '',
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

      if (fechaCierre < fechaApertura) {
        this.errorMessage = 'La fecha de cierre no puede ser menor que la fecha de apertura';
        return;
      }

      if (fechaApertura >= fechaEvento) {
        this.errorMessage = 'La fecha de apertura debe ser menor que la fecha del evento';
        return;
      }

      if (fechaCierre >= fechaEvento) {
        this.errorMessage = 'La fecha de cierre debe ser menor que la fecha del evento';
        return;
      }

      // Si es un evento gratuito, eliminamos el campo valor_base antes de enviar
      const eventoData = { ...this.evento };
      if (eventoData.tipo === 'gratuito') {
        delete eventoData.valor_base;
      }

      this.errorMessage = '';

      try {
        if (this.isEditing) {
          await updateEvento(this.eventoId, eventoData);
        } else {
          await createEvento(eventoData);
        }
        await this.fetchEventos();
        this.resetForm();
      } catch (error) {
        console.error('Error al guardar el evento:', error);
        this.errorMessage = 'Hubo un error al guardar el evento. Revisa los datos e inténtalo de nuevo.';
      }
    }
    ,
    editEvento(evento) {
      this.evento = { ...evento };
      this.eventoId = evento.id;
      this.isEditing = true;

      this.$nextTick(() => {
        this.$refs.eventoForm.scrollIntoView({ behavior: 'smooth' });
      });
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
      this.errorMessage = '';
    },
  },
};
</script>
