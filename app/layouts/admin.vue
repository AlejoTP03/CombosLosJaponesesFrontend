<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <NuxtLink to="/admin/dashboard" class="text-xl font-bold text-slate-900">Panel de Gestión</NuxtLink>
          <p class="text-sm text-slate-500">Zona privada para administrar productos, combos, pedidos y usuarios.</p>
        </div>
        <div class="flex flex-wrap gap-3 items-center">
          <NuxtLink to="/admin/dashboard" class="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">Dashboard</NuxtLink>
          <NuxtLink to="/admin/products" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition">Productos</NuxtLink>
          <NuxtLink to="/admin/combos" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition">Combos</NuxtLink>
          <NuxtLink to="/admin/orders" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition">Pedidos</NuxtLink>
          <NuxtLink to="/admin/users" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition">Usuarios</NuxtLink>
          <button @click="logout" class="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">Salir</button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin';
import { useRouter } from 'vue-router';

const adminStore = useAdminStore();
const router = useRouter();

const logout = () => {
  adminStore.clearAuth();
  router.push('/admin/login');
};
</script>
