import { useAdminStore } from '~/stores/admin';

export const useAdminApi = () => {
  const adminStore = useAdminStore();
  const config = useRuntimeConfig();
  const base = config.public.apiBase;

  const authHeaders = (options: RequestInit = {}) => {
    const headers: Record<string, string> = {};

    if (adminStore.token) {
      headers.Authorization = `Bearer ${adminStore.token}`;
    }

    const bodyIsFormData = options.body instanceof FormData;
    if (!bodyIsFormData) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  };

  const apiFetch = async <T = any>(path: string, options: RequestInit = {}) => {
    const response = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        ...authHeaders(options),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || 'Error en la API de administración');
    }

    return response.json() as Promise<T>;
  };

  return { apiFetch };
};
