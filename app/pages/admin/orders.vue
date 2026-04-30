<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Gestión de Pedidos</h1>
          <p class="text-gray-600 mt-2">Administra y actualiza el estado de todos los pedidos</p>
        </div>
        <div class="flex gap-4">
          <button @click="loadOrders" class="rounded-2xl bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition shadow-lg">
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Actualizar
          </button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-xl">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pendientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.filter(o => o.status === 'pendiente').length }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Confirmados</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.filter(o => o.status === 'confirmado').length }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-orange-100 rounded-xl">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a4 4 0 008 0V7l-4-4-4 4z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">En Camino</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.filter(o => o.status === 'en_camino').length }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-xl">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Entregados</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.filter(o => o.status === 'entregado').length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de pedidos -->
      <div class="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Pedidos ({{ orders.length }})</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th class="px-6 py-4">Cliente</th>
                <th class="px-6 py-4">Contacto</th>
                <th class="px-6 py-4">Ubicación</th>
                <th class="px-6 py-4">Total</th>
                <th class="px-6 py-4">Estado</th>
                <th class="px-6 py-4">Fecha</th>
                <th class="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id" class="border-t border-gray-200 hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="font-medium text-gray-900">{{ order.recipient_name }}</div>
                  <div class="text-sm text-gray-500">{{ order.address }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-gray-900">{{ order.phone }}</div>
                  <div class="text-sm text-gray-500">{{ order.email || 'Sin email' }}</div>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ order.municipality }}</td>
                <td class="px-6 py-4 font-semibold text-gray-900">${{ Number(order.total).toFixed(2) }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {{ order.status.replace('_', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ new Date(order.createdAt).toLocaleDateString() }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <select v-model="order.status" @change="updateStatus(order)" class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="en_camino">En Camino</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    <button @click="viewOrderDetails(order)" class="rounded-lg bg-gray-500 px-3 py-2 text-white hover:bg-gray-600 transition text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  No hay pedidos registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal de detalles del pedido -->
      <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedOrder = null">
        <div class="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Detalles del Pedido</h2>
            <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Cliente</label>
                <p class="text-gray-900">{{ selectedOrder.recipient_name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Teléfono</label>
                <p class="text-gray-900">{{ selectedOrder.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="text-gray-900">{{ selectedOrder.email || 'No proporcionado' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Municipio</label>
                <p class="text-gray-900">{{ selectedOrder.municipality }}</p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <p class="text-gray-900 bg-gray-50 p-3 rounded-lg">{{ selectedOrder.address }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Productos</label>
              <div class="bg-gray-50 p-3 rounded-lg">
                <pre class="text-sm text-gray-900 whitespace-pre-wrap">{{ selectedOrder.items }}</pre>
              </div>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-lg font-semibold text-gray-900">Total: ${{ Number(selectedOrder.total).toFixed(2) }}</span>
              <span :class="getStatusClass(selectedOrder.status)" class="px-3 py-1 rounded-full text-sm font-medium capitalize">
                {{ selectedOrder.status.replace('_', ' ') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p v-if="error" class="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">{{ error }}</p>
      <p v-if="success" class="mt-4 text-green-600 bg-green-50 p-3 rounded-lg">{{ success }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' });
import { ref, onMounted } from 'vue';
import { useAdminApi } from '~/composables/useAdminApi';

const orders = ref<any[]>([]);
const selectedOrder = ref<any>(null);
const error = ref('');
const success = ref('');
const { apiFetch } = useAdminApi();

const loadOrders = async () => {
  try {
    const data = await apiFetch('/orders');
    orders.value = data['Pedidos'] || [];
  } catch (err: any) {
    error.value = err.message;
  }
};

const updateStatus = async (order: any) => {
  error.value = '';
  success.value = '';
  try {
    await apiFetch(`/orders/${order.id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: order.status }),
    });
    success.value = 'Estado del pedido actualizado correctamente';
    setTimeout(() => success.value = '', 3000);
  } catch (err: any) {
    error.value = err.message;
  }
};

const viewOrderDetails = (order: any) => {
  selectedOrder.value = order;
};

const getStatusClass = (status: string) => {
  const classes = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-blue-100 text-blue-800',
    en_camino: 'bg-orange-100 text-orange-800',
    entregado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

onMounted(loadOrders);
</script>
