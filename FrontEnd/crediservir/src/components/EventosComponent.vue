<template>
  <div>
    <h1>Gestión de Eventos</h1>

    <!-- Formulario para crear/editar evento -->
    <form @submit.prevent="submitForm">
      <input v-model="evento.titulo" placeholder="Título" required />
      <textarea v-model="evento.descripcion" placeholder="Descripción"></textarea>
      <input v-model="evento.fecha" type="date" required />
      <input v-model="evento.hora" type="time" required />
      <input v-model="evento.lugar" placeholder="Lugar" required />
      <input v-model="evento.cupo_disponible" type="number" placeholder="Cupo Disponible" required min="1"/>
      <select v-model="evento.tipo" required>
        <option value="gratuito">Gratuito</option>
        <option value="pago">Pago</option>
      </select>
      <input v-model="evento.valor_base" type="number" placeholder="Valor Base" v-if="evento.tipo === 'pago'"  min="1"/>
      <input v-model="evento.categorias" placeholder="Categorías (separadas por comas)" />
      <input v-model="evento.fecha_apertura" type="date" placeholder="Fecha de Apertura Inscripción" required />
      <input v-model="evento.fecha_cierre" type="date" placeholder="Fecha de Cierre Inscripción" required />

      <!-- Mostrar mensaje de error si la validación falla -->
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

      <button type="submit">Guardar Evento</button>
    </form>

    <!-- Lista de eventos -->
    <ul>
      <li v-for="evento in eventos" :key="evento.id">
        {{ evento.titulo }} - {{ evento.fecha }}
        <button @click="editEvento(evento)">Editar</button>
        <button @click="deleteEvento(evento.id)">Eliminar</button>
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

  // Si es un evento gratuito, eliminamos el campo valor_base antes de enviar
  const eventoData = { ...this.evento };
  if (eventoData.tipo === 'gratuito') {
    delete eventoData.valor_base; // Eliminar el campo valor_base para eventos gratuitos
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
}
,
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
