<template class="max-w-4xl mx-auto py-8 px-8 overflow-y-auto scrollbar-thin scrollbar-thumb scrollbar-track">
  <div id="app">
    <Navbar />
    <div class="mt-16">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>