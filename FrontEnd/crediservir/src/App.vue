<template class="max-w-4xl mx-auto py-8 px-8 overflow-y-auto scrollbar-thin scrollbar-thumb scrollbar-track">
  <div id="app">
    <Navbar /> <!-- Componente de navegación -->
    <div class="mt-16"> <!-- Espacio para el contenido principal -->
      <router-view /> <!-- Este es el lugar donde se renderizarán las rutas -->
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'App',
  components: {
    Navbar, // Declaración del componente Navbar
  },
};
</script>

<style>
/* Aquí puedes agregar estilos globales si los necesitas */
</style>
