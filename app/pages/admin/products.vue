<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Gestión de Productos</h1>
          <p class="text-gray-600 mt-2">Administra el inventario de productos de tu tienda</p>
        </div>
        <button @click="toggleForm" class="self-start rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition shadow-lg">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {{ showForm ? 'Ocultar formulario' : 'Nuevo Producto' }}
        </button>
      </div>

      <!-- Formulario -->
      <div v-if="showForm" class="mb-8 bg-white rounded-3xl border border-gray-200 p-8 shadow-xl">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">{{ editingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
        <form @submit.prevent="editingProduct ? updateProduct() : createProduct()" class="grid gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
            <input v-model="formData.name" required placeholder="Ej: Sushi de Salmón" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
            <input v-model="formData.price" required type="number" min="0.01" step="0.01" placeholder="0.00" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <input v-model="formData.category" placeholder="Ej: Sushi, Ramen, etc." class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
            <input @change="handleImageChange" type="file" accept="image/*" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            <p class="text-sm text-gray-500 mt-1">Selecciona una imagen para el producto (opcional)</p>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea v-model="formData.description" placeholder="Describe el producto..." rows="4" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea>
          </div>
          <div class="sm:col-span-2 flex gap-4">
            <button type="submit" class="rounded-2xl bg-emerald-500 px-8 py-3 text-white font-semibold hover:bg-emerald-600 transition shadow-lg">
              {{ editingProduct ? 'Actualizar Producto' : 'Crear Producto' }}
            </button>
            <button v-if="editingProduct" @click="cancelEdit" type="button" class="rounded-2xl bg-gray-500 px-8 py-3 text-white font-semibold hover:bg-gray-600 transition">
              Cancelar
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">{{ error }}</p>
        <p v-if="success" class="mt-4 text-green-600 bg-green-50 p-3 rounded-lg">{{ success }}</p>
      </div>

      <!-- Tabla de productos -->
      <div class="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Productos ({{ products.length }})</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th class="px-6 py-4">Producto</th>
                <th class="px-6 py-4">Precio</th>
                <th class="px-6 py-4">Categoría</th>
                <th class="px-6 py-4">Estado</th>
                <th class="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="border-t border-gray-200 hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <img
                      v-if="product.image"
                      :src="`${backendBaseUrl}${product.image}`"
                      :alt="product.name"
                      class="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <div class="font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900">${{ Number(product.price).toFixed(2) }}</td>
                <td class="px-6 py-4 text-gray-600">{{ product.category || 'Sin categoría' }}</td>
                <td class="px-6 py-4">
                  <span :class="product.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ product.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button @click="editProduct(product)" class="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 transition text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button @click="toggleStatus(product)" :class="product.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'" class="rounded-lg px-3 py-2 text-white transition text-sm">
                      {{ product.isActive ? 'Desactivar' : 'Activar' }}
                    </button>
                    <button @click="removeProduct(product.id)" class="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-5v2m0 0v2m0-2h2m-2 0h-2"/>
                  </svg>
                  No hay productos disponibles.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' });
import { ref, onMounted } from 'vue';
import { useAdminApi } from '~/composables/useAdminApi';

const config = useRuntimeConfig();
const backendBaseUrl = config.public.apiBase.replace(/\/api\/?$/, '');

const products = ref<any[]>([]);
const showForm = ref(false);
const error = ref('');
const success = ref('');
const editingProduct = ref<any>(null);
const selectedImage = ref<File | null>(null);
const formData = ref({
  name: '',
  price: '',
  description: '',
  category: '',
});

const { apiFetch } = useAdminApi();

const loadProducts = async () => {
  try {
    const data = await apiFetch('/products/admin');
    products.value = data['Productos (admin)'] || [];
  } catch (err: any) {
    error.value = err.message;
  }
};

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedImage.value = target.files?.[0] || null;
};

const createProduct = async () => {
  error.value = '';
  success.value = '';
  try {
    const form = new FormData();
    form.append('name', formData.value.name);
    form.append('price', formData.value.price);
    form.append('description', formData.value.description);
    form.append('category', formData.value.category);
    if (selectedImage.value) {
      form.append('image', selectedImage.value);
    }

    await apiFetch('/products', {
      method: 'POST',
      body: form,
    });
    success.value = 'Producto creado correctamente';
    resetForm();
    await loadProducts();
  } catch (err: any) {
    error.value = err.message;
  }
};

const editProduct = (product: any) => {
  editingProduct.value = product;
  formData.value = {
    name: product.name,
    price: product.price.toString(),
    description: product.description || '',
    category: product.category || '',
  };
  selectedImage.value = null;
  showForm.value = true;
};

const updateProduct = async () => {
  if (!editingProduct.value) return;
  error.value = '';
  success.value = '';
  try {
    const form = new FormData();
    form.append('name', formData.value.name);
    form.append('price', formData.value.price);
    form.append('description', formData.value.description);
    form.append('category', formData.value.category);
    if (selectedImage.value) {
      form.append('image', selectedImage.value);
    }

    await apiFetch(`/products/${editingProduct.value.id}`, {
      method: 'PUT',
      body: form,
    });
    success.value = 'Producto actualizado correctamente';
    resetForm();
    await loadProducts();
  } catch (err: any) {
    error.value = err.message;
  }
};

const cancelEdit = () => {
  editingProduct.value = null;
  resetForm();
};

const resetForm = () => {
  formData.value = { name: '', price: '', description: '', category: '' };
  selectedImage.value = null;
  editingProduct.value = null;
  showForm.value = false;
};

const removeProduct = async (id: string) => {
  if (!confirm('¿Eliminar producto permanentemente? Esta acción no se puede deshacer.')) return;
  try {
    await apiFetch(`/products/${id}/hard-delete`, { method: 'DELETE' });
    await loadProducts();
  } catch (err: any) {
    error.value = err.message;
  }
};

const toggleStatus = async (product: any) => {
  try {
    if (product.isActive) {
      await apiFetch(`/products/${product.id}`, { method: 'DELETE' });
    } else {
      await apiFetch(`/products/${product.id}/restore`, { method: 'POST' });
    }
    await loadProducts();
  } catch (err: any) {
    error.value = err.message;
  }
};

const toggleForm = () => {
  if (showForm.value && editingProduct.value) {
    cancelEdit();
  } else {
    showForm.value = !showForm.value;
  }
};

onMounted(loadProducts);
</script>
