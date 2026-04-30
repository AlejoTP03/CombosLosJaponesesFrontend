import { useAdminStore } from '~/stores/admin';

export default defineNuxtRouteMiddleware((to) => {
  const adminStore = useAdminStore();
  if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !adminStore.isLoggedIn) {
    return navigateTo('/admin/login');
  }
  if (to.path === '/admin/login' && adminStore.isLoggedIn) {
    return navigateTo('/admin/dashboard');
  }
});
