<template>
    <div class="max-w-4xl mx-auto py-8 px-8">
        <h1 class="text-3xl font-bold mb-6">Pagos y Facturación</h1>

        <!-- Seleccionar Asistente -->
        <div class="mb-4">
            <label class="block text-gray-500 font-bold mb-2">Selecciona un Asistente:</label>
            <select v-model="selectedAsistente" class="border p-2 w-full">
                <option v-for="asistente in asistentes" :key="asistente.id" :value="asistente.id">
                    {{ asistente.nombre }} {{ asistente.apellido }}
                </option>
            </select>
        </div>

        <!-- Lista de Eventos -->
        <h2 class="text-xl font-bold mb-4">Selecciona un Evento:</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="evento in eventos" :key="evento.id" class="bg-white shadow-md rounded p-4">
                <h3 class="text-xl font-bold">{{ evento.titulo }}</h3>
                <p class="pt-2"><strong>Descripción:</strong> {{ evento.descripcion }}</p>
                <p class="pt-1"><strong>Fecha:</strong> {{ evento.fecha }} <strong>Hora:</strong> {{ evento.hora }}</p>
                <p class="pt-1"><strong>Lugar:</strong> {{ evento.lugar }}</p>
                <p class="pt-1"><strong>Cupo Disponible:</strong> {{ evento.cupo_disponible }}</p>
                <p class="pt-1"><strong>Tipo:</strong> {{ evento.tipo }}</p>
                <p class="pt-1" v-if="evento.tipo === 'pago'"><strong>Valor Base:</strong> {{ evento.valor_base }}</p>

                <!-- Selección de Tipo de Entrada -->
                <div class="">
                    <p class="pt-1"><strong>Tipo de entrada:</strong></p>
                    <select v-model="tipoEntrada[evento.id]" class="border p-2 w-full" required
                        :disabled="evento.tipo === 'gratuito'">
                        <option value="gratis">Gratis</option>
                        <option value="general">General</option>
                        <option value="VIP">VIP</option>
                    </select>

                </div>

                <div>
                    <p class="pt-1"><strong>Codigo promocional:</strong></p>
                    <input v-model="codigoPromocional" class="border p-2 w-full mb-4"
                        placeholder="Ingrese el código promocional (Opcional)" />
                </div>


                <!-- Botón de Comprar -->
                <button @click="comprar(evento.id)"
                    class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Comprar</button>
            </div>
        </div>

        <!-- Mostrar mensaje de éxito o error -->
        <p v-if="mensaje" class="text-red-500">{{ mensaje }}</p>
    </div>
</template>

<script>
import { getAsistentes } from '../services/asistentesService';
import { getEventos } from '../services/eventosService';

export default {
    name: 'PagosComponent',
    data() {
        return {
            asistentes: [],
            eventos: [],
            selectedAsistente: null,
            tipoEntrada: {}, // Para almacenar el tipo de entrada seleccionado por evento
            mensaje: '',
            codigoPromocional: '', // Mensaje de éxito o error
        };
    },
    async created() {
        await this.fetchAsistentes();
        await this.fetchEventos();
    },
    methods: {
        async fetchAsistentes() {
            try {
                this.asistentes = await getAsistentes();
            } catch (error) {
                console.error('Error al obtener asistentes:', error);
            }
        },
        async fetchEventos() {
            try {
                this.eventos = await getEventos();
                this.eventos.forEach(evento => {
                    this.tipoEntrada[evento.id] = evento.tipo === 'gratuito' ? 'gratis' : 'gratis'; // Preselecciona "Gratis" para eventos gratuitos
                });
            } catch (error) {
                console.error('Error al obtener eventos:', error);
            }
        },
        async comprar(eventoId) {
            // Lógica para manejar la compra
            const tipo = this.tipoEntrada[eventoId];

            if (!this.selectedAsistente) {
                this.mensaje = 'Debes seleccionar un asistente.';
                return;
            }

            if (tipo) {
                // Aquí deberías implementar la lógica de compra usando el eventoId y selectedAsistente
                // y el tipo de entrada seleccionado.
                this.mensaje = `Compra realizada para el evento ID: ${eventoId} con tipo de entrada: ${tipo}.`;
            } else {
                this.mensaje = 'Debes seleccionar un tipo de entrada.';
            }
        },
    },
};
</script>

<style scoped>
/* Estilos personalizados aquí */
</style>