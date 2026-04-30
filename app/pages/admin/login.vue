<template>
  <div class="max-w-md mx-auto mt-20 bg-white rounded-3xl shadow-2xl p-8">
    <h1 class="text-3xl font-bold text-slate-900 mb-6">Acceso al panel</h1>
    <p class="text-slate-500 mb-8">Ingresa tu usuario y contraseña para administrar el sitio.</p>

    <form @submit.prevent="onSubmit" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-slate-700">Usuario</label>
        <input v-model="form.username" required placeholder="admin" class="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700">Contraseña</label>
        <input type="password" v-model="form.password" required placeholder="••••••••" class="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
      </div>
      <button type="submit" :disabled="loading" class="w-full bg-orange-500 text-white rounded-2xl py-3 font-semibold hover:bg-orange-600 transition disabled:opacity-60">{{ loading ? 'Ingresando...' : 'Ingresar' }}</button>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' });
import { ref } from 'vue';
import { useAdminStore } from '~/stores/admin';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#imports';

const adminStore = useAdminStore();
const router = useRouter();
const config = useRuntimeConfig();

const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref('');

const onSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(`${config.public.apiBase}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'No se pudo iniciar sesión');
    }

    const data = await response.json();
    adminStore.setAuth(data.auth.token, data.auth.user);
    await router.push('/admin/dashboard');
  } catch (err: any) {
    error.value = err.message || 'Error en el inicio de sesión';
  } finally {
    loading.value = false;
  }
};
</script>
