import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  const token = ref('');
  const user = ref<{ id: string; username: string; role: string } | null>(null);

  if (import.meta.client) {
    const saved = localStorage.getItem('admin-session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        token.value = parsed.token || '';
        user.value = parsed.user || null;
      } catch (error) {
        console.error('Error leyendo sesión de administrador', error);
      }
    }
  }

  const isLoggedIn = computed(() => !!token.value);

  const persist = () => {
    if (!import.meta.client) return;
    localStorage.setItem('admin-session', JSON.stringify({ token: token.value, user: user.value }));
  };

  const setAuth = (newToken: string, newUser: { id: string; username: string; role: string }) => {
    token.value = newToken;
    user.value = newUser;
    persist();
  };

  const clearAuth = () => {
    token.value = '';
    user.value = null;
    if (import.meta.client) {
      localStorage.removeItem('admin-session');
    }
  };

  watch([token, user], persist, { deep: true });

  return { token, user, isLoggedIn, setAuth, clearAuth };
});
