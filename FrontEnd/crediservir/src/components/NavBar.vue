<template>
  <Disclosure as="nav" class v-slot="{ open }" :style="{ backgroundColor: '#289580' }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto"
              src="https://www.crediservir.coop/Files/Logo/logos-45.png"
              alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="item.current ? 'bg-lime-400 text-white' : 'text-white hover:bg-gray-700 hover:text-white'"
                aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="router-link" :to="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const navigation = ref([
  { name: 'Gestion de Eventos', href: '/eventos', current: false },
  { name: 'Panel de Administración', href: '/administracion', current: false },
  { name: 'Asistentes', href: '/asistentes', current: false },
  { name: 'Pagos', href: '/pagos', current: false },
  { name: 'Promociones', href: '/promociones', current: false },
]);

const route = useRoute();
watch(route, () => {
  navigation.value.forEach(item => {
    item.current = route.path === item.href;
  });
});

navigation.value.forEach(item => {
  item.current = route.path === item.href;
});
</script>
