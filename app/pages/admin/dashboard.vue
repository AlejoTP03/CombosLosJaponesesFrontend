<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Panel de Administración</h1>
        <p class="text-gray-600 mt-2">Bienvenido al centro de control de tu tienda</p>
      </div>

      <!-- Estadísticas -->
      <div class="grid gap-6 lg:grid-cols-4 mb-8">
        <div class="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Productos</div>
              <div class="mt-2 text-3xl font-bold text-gray-900">{{ stats.productsCount }}</div>
              <div class="text-sm text-green-600 font-medium">Activos</div>
            </div>
            <div class="p-3 bg-orange-100 rounded-xl">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Combos</div>
              <div class="mt-2 text-3xl font-bold text-gray-900">{{ stats.combosCount }}</div>
              <div class="text-sm text-blue-600 font-medium">Disponibles</div>
            </div>
            <div class="p-3 bg-blue-100 rounded-xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pedidos</div>
              <div class="mt-2 text-3xl font-bold text-gray-900">{{ stats.ordersCount }}</div>
              <div class="text-sm text-purple-600 font-medium">Totales</div>
            </div>
            <div class="p-3 bg-purple-100 rounded-xl">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Usuarios</div>
              <div class="mt-2 text-3xl font-bold text-gray-900">{{ stats.usersCount }}</div>
              <div class="text-sm text-indigo-600 font-medium">Administradores</div>
            </div>
            <div class="p-3 bg-indigo-100 rounded-xl">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="grid gap-6 lg:grid-cols-2 mb-8">
        <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Acciones Rápidas
          </h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <NuxtLink to="/admin/products" class="group flex items-center p-4 rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-200">
              <div class="p-3 bg-orange-500 rounded-xl mr-4 group-hover:bg-orange-600 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Productos</div>
                <div class="text-sm text-gray-600">Gestionar inventario</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/admin/combos" class="group flex items-center p-4 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <div class="p-3 bg-blue-500 rounded-xl mr-4 group-hover:bg-blue-600 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Combos</div>
                <div class="text-sm text-gray-600">Administrar ofertas</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/admin/orders" class="group flex items-center p-4 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
              <div class="p-3 bg-purple-500 rounded-xl mr-4 group-hover:bg-purple-600 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Pedidos</div>
                <div class="text-sm text-gray-600">Ver y actualizar</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/admin/users" class="group flex items-center p-4 rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200">
              <div class="p-3 bg-indigo-500 rounded-xl mr-4 group-hover:bg-indigo-600 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Usuarios</div>
                <div class="text-sm text-gray-600">Gestionar accesos</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Información del sistema -->
        <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Información del Sistema
          </h2>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p class="text-gray-900 font-medium">Estado del servidor</p>
                <p class="text-sm text-gray-600">Backend funcionando correctamente</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p class="text-gray-900 font-medium">Base de datos</p>
                <p class="text-sm text-gray-600">PostgreSQL conectado</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p class="text-gray-900 font-medium">Última actualización</p>
                <p class="text-sm text-gray-600">{{ new Date().toLocaleDateString('es-ES') }}</p>
              </div>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p class="text-sm text-blue-800">
              <strong>Consejo:</strong> Mantén tu inventario actualizado para ofrecer la mejor experiencia a tus clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' });
import { ref, onMounted } from 'vue';
import { useAdminApi } from '~/composables/useAdminApi';

const stats = ref({ productsCount: 0, combosCount: 0, ordersCount: 0, usersCount: 0 });
const { apiFetch } = useAdminApi();

const loadStats = async () => {
  try {
    const data = await apiFetch('/admin/stats');
    stats.value = data.stats;
  } catch (error) {
    console.error('Error cargando estadísticas de administración', error);
  }
};

onMounted(loadStats);
</script>
