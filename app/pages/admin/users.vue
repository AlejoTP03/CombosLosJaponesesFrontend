<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p class="text-gray-600 mt-2">Administra los usuarios con acceso al panel de administración</p>
        </div>
        <button @click="toggleForm" class="self-start rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition shadow-lg">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          {{ showForm ? 'Ocultar formulario' : 'Nuevo Usuario' }}
        </button>
      </div>

      <!-- Formulario -->
      <div v-if="showForm" class="mb-8 bg-white rounded-3xl border border-gray-200 p-8 shadow-xl">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">{{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
        <form @submit.prevent="editingUser ? updateUser() : createUser()" class="grid gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario</label>
            <input v-model="formData.username" required placeholder="Ej: admin_juan" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input v-model="formData.password" :required="!editingUser" type="password" placeholder="Contraseña segura" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <p class="text-sm text-gray-500 mt-1">{{ editingUser ? 'Deja vacío para mantener la contraseña actual' : 'Mínimo 6 caracteres' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rol</label>
            <select v-model="formData.role" class="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div class="sm:col-span-2 flex gap-4">
            <button type="submit" class="rounded-2xl bg-emerald-500 px-8 py-3 text-white font-semibold hover:bg-emerald-600 transition shadow-lg">
              {{ editingUser ? 'Actualizar Usuario' : 'Crear Usuario' }}
            </button>
            <button v-if="editingUser" @click="cancelEdit" type="button" class="rounded-2xl bg-gray-500 px-8 py-3 text-white font-semibold hover:bg-gray-600 transition">
              Cancelar
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">{{ error }}</p>
        <p v-if="success" class="mt-4 text-green-600 bg-green-50 p-3 rounded-lg">{{ success }}</p>
      </div>

      <!-- Tabla de usuarios -->
      <div class="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Usuarios ({{ users.length }})</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th class="px-6 py-4">Usuario</th>
                <th class="px-6 py-4">Rol</th>
                <th class="px-6 py-4">Último acceso</th>
                <th class="px-6 py-4">Creado</th>
                <th class="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-t border-gray-200 hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">{{ user.username }}</div>
                      <div class="text-sm text-gray-500">{{ user.email || 'Sin email' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" class="px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.lastLogin ? formatDate(user.lastLogin) : 'Nunca' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(user.createdAt) }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button @click="editUser(user)" class="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 transition text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button @click="resetPassword(user)" class="rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600 transition text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                      </svg>
                    </button>
                    <button @click="deleteUser(user.id)" class="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition text-sm" :disabled="user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  No hay usuarios creados.
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

const users = ref<any[]>([]);
const showForm = ref(false);
const error = ref('');
const success = ref('');
const editingUser = ref<any>(null);
const formData = ref({
  username: '',
  password: '',
  role: 'admin'
});
const { apiFetch } = useAdminApi();

const loadUsers = async () => {
  try {
    const data = await apiFetch('/admin/users');
    users.value = data.users || [];
  } catch (err: any) {
    error.value = err.message;
  }
};

const createUser = async () => {
  error.value = '';
  success.value = '';
  try {
    await apiFetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify(formData.value),
    });
    success.value = 'Usuario creado correctamente';
    resetForm();
    await loadUsers();
  } catch (err: any) {
    error.value = err.message;
  }
};

const editUser = (user: any) => {
  editingUser.value = user;
  formData.value = {
    username: user.username,
    password: '',
    role: user.role
  };
  showForm.value = true;
};

const updateUser = async () => {
  if (!editingUser.value) return;
  error.value = '';
  success.value = '';
  try {
    const updateData = { ...formData.value };
    if (!updateData.password) delete updateData.password; // No cambiar contraseña si está vacío

    await apiFetch(`/admin/users/${editingUser.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
    success.value = 'Usuario actualizado correctamente';
    resetForm();
    await loadUsers();
  } catch (err: any) {
    error.value = err.message;
  }
};

const resetPassword = async (user: any) => {
  if (!confirm(`¿Restablecer la contraseña de ${user.username} a 'password123'?`)) return;
  try {
    await apiFetch(`/admin/users/${user.id}/reset-password`, {
      method: 'POST',
    });
    success.value = 'Contraseña restablecida correctamente';
    setTimeout(() => success.value = '', 3000);
  } catch (err: any) {
    error.value = err.message;
  }
};

const deleteUser = async (id: string) => {
  const user = users.value.find(u => u.id === id);
  if (user.role === 'admin' && users.value.filter(u => u.role === 'admin').length === 1) {
    error.value = 'No puedes eliminar el último administrador';
    return;
  }
  if (!confirm('¿Eliminar este usuario permanentemente?')) return;
  try {
    await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
    await loadUsers();
  } catch (err: any) {
    error.value = err.message;
  }
};

const cancelEdit = () => {
  editingUser.value = null;
  resetForm();
};

const resetForm = () => {
  formData.value = { username: '', password: '', role: 'admin' };
  editingUser.value = null;
  showForm.value = false;
};

const toggleForm = () => {
  if (showForm.value && editingUser.value) {
    cancelEdit();
  } else {
    showForm.value = !showForm.value;
  }
};

const formatDate = (value: string) => new Date(value).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });

onMounted(loadUsers);
</script>
