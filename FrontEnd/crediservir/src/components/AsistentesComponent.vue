<template>
    <div class="max-w-4xl mx-auto py-8 px-8">
        <h1 class="text-3xl font-bold mb-6">Gestión de Asistentes</h1>

        <!-- Formulario para crear/editar asistente -->
        <form @submit.prevent="submitForm" class="mb-8" ref="asistenteForm">
            <div>
                <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="nombre">
                    Nombre:
                </label>
                <input v-model="asistente.nombre" class="border p-2 w-full mb-4" placeholder="Nombre" required />
            </div>
            <div>
                <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="apellido">
                    Apellido:
                </label>
                <input v-model="asistente.apellido" class="border p-2 w-full mb-4" placeholder="Apellido" required />
            </div>
            <div>
                <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="fecha_nacimiento">
                    Fecha de Nacimiento:
                </label>
                <input v-model="asistente.fecha_nacimiento" class="border p-2 w-full mb-4" type="date"
                    placeholder="Fecha de Nacimiento" />
            </div>
            <div>
                <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="email">
                    Email:
                </label>
                <input v-model="asistente.email" class="border p-2 w-full mb-4" placeholder="Email" required />
            </div>
            <div>
                <label class="block text-gray-500 font-bold text-lg mb-1 md:mb-0 pr-4" for="celular">
                    Celular:
                </label>
                <input v-model="asistente.celular" class="border p-2 w-full mb-4" placeholder="Celular" />
            </div>

            <!-- Mostrar mensaje de error si la validación falla -->
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Guardar
                Asistente</button>
        </form>

        <!-- Lista de asistentes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="asistente in asistentes" :key="asistente.id" class="bg-white shadow-md rounded p-4">
                <h3 class="text-xl font-bold">{{ asistente.nombre }} {{ asistente.apellido }}</h3>
                <p class="pt-1"><strong>Fecha de Nacimiento:</strong> {{ asistente.fecha_nacimiento }}</p>
                <p class="pt-2"><strong>Email:</strong> {{ asistente.email }}</p>
                <p class="pt-1"><strong>Celular:</strong> {{ asistente.celular }}</p>

                <div class="pt-2">
                    <button @click="editAsistente(asistente)"
                        class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">Editar</button>
                    <button @click="deleteAsistente(asistente.id)"
                        class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAsistentes, createAsistente, updateAsistente, deleteAsistente } from '../services/asistentesService';

export default {
    name: 'AsistentesComponent',
    data() {
        return {
            asistentes: [],
            asistente: {
                nombre: '',
                apellido: '',
                fecha_nacimiento: '',
                email: '',
                celular: ''
            },
            isEditing: false,
            asistenteId: null, // Para saber si estamos editando
            errorMessage: '', // Para mostrar mensajes de error
        };
    },
    async created() {
        await this.fetchAsistentes();
    },
    methods: {
        async fetchAsistentes() {
            try {
                this.asistentes = await getAsistentes();
            } catch (error) {
                console.error('Error al obtener asistentes:', error);
            }
        },
        async submitForm() {
            try {
                if (this.asistenteId) {
                    await updateAsistente(this.asistenteId, this.asistente);
                } else {
                    await createAsistente(this.asistente);
                }
                await this.fetchAsistentes();
                this.resetForm();
            } catch (error) {
                console.error('Error al guardar el asistente:', error);
                this.errorMessage = 'Hubo un error al guardar el asistente. Revisa los datos e inténtalo de nuevo.';
            }
        },
        editAsistente(asistente) {
            this.asistente = { ...asistente };
            this.asistenteId = asistente.id;
            // Hacer scroll hacia el formulario
            this.$nextTick(() => {
                this.$refs.asistenteForm.scrollIntoView({ behavior: 'smooth' });
            });
        },
        async deleteAsistente(id) {
            try {
                await deleteAsistente(id);
                await this.fetchAsistentes();
            } catch (error) {
                console.error('Error al eliminar el asistente:', error);
                this.errorMessage = 'No se pudo eliminar el asistente. Puede estar relacionado con otros datos.';
            }
        },
        resetForm() {
            this.asistente = {
                nombre: '',
                apellido: '',
                fecha_nacimiento: '',
                email: '',
                celular: ''
            };
            this.isEditing = false;
            this.asistenteId = null;
            this.errorMessage = ''; // Limpiar el mensaje de error al resetear el formulario
        },
    },
};
</script>