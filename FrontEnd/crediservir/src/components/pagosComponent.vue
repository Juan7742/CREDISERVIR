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
                <div>
                    <p class="pt-1"><strong>Tipo de entrada:</strong></p>
                    <select v-model="tipoEntrada[evento.id]" class="border p-2 w-full" required
                        :disabled="evento.tipo === 'gratuito'">
                        <option value="gratis">Gratis</option>
                        <option value="general">General</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>

                <!-- Mostrar Costo Adicional -->
                <p class="pt-2"><strong>Costo Adicional:</strong> {{ calcularCostoAdicional(evento.id) }}</p>

                <div>
                    <p class=""><strong>Código promocional:</strong></p>
                    <input v-model="codigoPromocional[evento.id]" class="border p-2 w-full mb-4"
                        placeholder="Ingrese el código promocional (Opcional)" />
                    <button @click="buscarCodigoPromocional(evento.id)"
                        class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Buscar</button>
                </div>

                <p v-if="descuentoPromocional[evento.id] !== null" class="pt-2">
                    <strong>Descuento del código promocional:</strong> {{ descuentoPromocional[evento.id] }}%
                </p>

                <!-- Total a Pagar -->
                <p class="pt-2"><strong>Total a pagar:</strong> {{ calcularTotal(evento.id) }} </p>

                <!-- Botón de Comprar -->
                <button @click="comprar(evento.id)" :disabled="evento.cupo_disponible === 0"
                    class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                    Comprar
                </button>
            </div>
        </div>

        <!-- Mostrar mensaje de éxito o error -->
        <p v-if="mensaje" class="text-red-500">{{ mensaje }}</p>
    </div>
</template>

<script>
import { getAsistentes } from '../services/asistentesService';
import { getEventos } from '../services/eventosService';
import { buscarPromocion } from '../services/promocionesService';

export default {
    name: 'PagosComponent',
    data() {
        return {
            asistentes: [],
            eventos: [],
            selectedAsistente: null,
            tipoEntrada: {},
            mensaje: '',
            codigoPromocional: {}, // Cambiado a objeto para manejar el código por evento
            descuentoPromocional: {}, // Cambiado a objeto para manejar el descuento por evento
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
                    this.tipoEntrada[evento.id] = evento.tipo === 'gratuito' ? 'gratis' : 'gratis';
                });
            } catch (error) {
                console.error('Error al obtener eventos:', error);
            }
        },
        async buscarCodigoPromocional(eventoId) {
            try {
                const response = await buscarPromocion(this.codigoPromocional[eventoId]);
                this.descuentoPromocional[eventoId] = response.porcentaje_descuento;
            } catch (error) {
                console.error('Error al buscar código promocional:', error);
                this.descuentoPromocional[eventoId] = null;
            }
        },
        calcularCostoAdicional(eventoId) {
            const tipo = this.tipoEntrada[eventoId];
            const evento = this.eventos.find(event => event.id === eventoId);
            let costoAdicional = 0;

            if (tipo === 'general') {
                costoAdicional = (evento.valor_base * 0.15).toFixed(2);
            } else if (tipo === 'VIP') {
                costoAdicional = (evento.valor_base * 0.30).toFixed(2);
            }

            return costoAdicional;
        },
        calcularTotal(eventoId) {
            const costoAdicional = parseFloat(this.calcularCostoAdicional(eventoId));
            const evento = this.eventos.find(event => event.id === eventoId);
            let total = parseFloat(evento.valor_base) + costoAdicional;

            // Aplicar descuento si existe
            if (this.descuentoPromocional[eventoId]) {
                total -= (total * this.descuentoPromocional[eventoId]) / 100;
            }

            return total.toFixed(2); // Redondear a 2 decimales
        },
        async comprar(eventoId) {
            const tipo = this.tipoEntrada[eventoId];

            if (!this.selectedAsistente) {
                this.mensaje = 'Debes seleccionar un asistente.';
                return;
            }

            if (tipo) {
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
