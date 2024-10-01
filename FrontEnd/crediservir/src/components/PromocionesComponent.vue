<template>
  <div class="max-w-4xl mx-auto py-8 px-8">
    <h1 class="text-3xl font-bold mb-6">Gestión de Códigos Promocionales</h1>

    <form @submit.prevent="submitForm" class="mb-8" ref="promocionForm">
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4">Código:</label>
        <input v-model="promocion.codigo" class="border p-2 w-full mb-4" placeholder="Código" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4">Porcentaje de Descuento:</label>
        <input v-model="promocion.porcentaje_descuento" type="number" min="0" max="100" class="border p-2 w-full mb-4" placeholder="Porcentaje" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4">Fecha de Inicio:</label>
        <input v-model="promocion.fecha_inicio" type="date" class="border p-2 w-full mb-4" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4">Fecha de Fin:</label>
        <input v-model="promocion.fecha_fin" type="date" class="border p-2 w-full mb-4" required />
      </div>
      <div>
        <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4">Estado:</label>
        <select v-model="promocion.estado" class="border p-2 w-full mb-4" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Guardar Código</button>
    </form>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="promo in promociones" :key="promo.id" class="bg-white shadow-md rounded p-4">
        <h3 class="text-xl font-bold">{{ promo.codigo }}</h3>
        <p class="pt-1"><strong>Porcentaje de Descuento:</strong> {{ promo.porcentaje_descuento }}%</p>
        <p class="pt-1"><strong>Fecha de Inicio:</strong> {{ promo.fecha_inicio }}</p>
        <p class="pt-1"><strong>Fecha de Fin:</strong> {{ promo.fecha_fin }}</p>
        <p class="pt-1"><strong>Estado:</strong> {{ promo.estado }}</p>

        <div class="pt-2">
          <button @click="editPromocion(promo)" class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">Editar</button>
          <button @click="deletePromocion(promo.id)" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerCodigosPromocionales, crearCodigoPromocional, actualizarCodigoPromocional, eliminarCodigoPromocional } from '../services/promocionesService';

export default {
  name: 'PromocionesComponent',
  data() {
    return {
      promociones: [],
      promocion: {
        codigo: '',
        porcentaje_descuento: null,
        fecha_inicio: '',
        fecha_fin: '',
        estado: 'activo'
      },
      promocionId: null,
      errorMessage: '',
    };
  },
  async created() {
    await this.fetchPromociones();
  },
  methods: {
    async fetchPromociones() {
      try {
        this.promociones = await obtenerCodigosPromocionales();
      } catch (error) {
        console.error('Error al obtener promociones:', error);
      }
    },
    async submitForm() {
      try {
        if (this.promocionId) {
          await actualizarCodigoPromocional(this.promocionId, this.promocion);
        } else {
          await crearCodigoPromocional(this.promocion);
        }
        await this.fetchPromociones();
        this.resetForm();
      } catch (error) {
        console.error('Error al guardar el código promocional:', error);
        this.errorMessage = 'Hubo un error al guardar el código promocional. Revisa los datos e inténtalo de nuevo.';
      }
    },
    editPromocion(promo) {
      this.promocion = { ...promo };
      this.promocionId = promo.id;
      this.$nextTick(() => {
        this.$refs.promocionForm.scrollIntoView({ behavior: 'smooth' });
      });
    },
    async deletePromocion(id) {
      try {
        await eliminarCodigoPromocional(id);
        await this.fetchPromociones();
      } catch (error) {
        console.error('Error al eliminar el código promocional:', error);
        this.errorMessage = 'No se pudo eliminar el código promocional. Puede estar relacionado con otros datos.';
      }
    },
    resetForm() {
      this.promocion = {
        codigo: '',
        porcentaje_descuento: null,
        fecha_inicio: '',
        fecha_fin: '',
        estado: 'activo'
      };
      this.promocionId = null;
      this.errorMessage = '';
    },
  },
};
</script>
