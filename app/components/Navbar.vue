<!-- components/Navbar.vue -->
<template>
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo con imagen -->
            <NuxtLink to="/" class="flex items-center gap-2">
            <img 
                src="/logo.jpg" 
                alt="Combos Los Japoneses" 
                class="w-10 h-10 rounded-xl object-cover shadow-lg"
                @error="handleLogoError"
            />
            <div>
                <h1 class="text-lg font-bold text-gray-800 leading-tight">Combos Los Japoneses</h1>
                <p class="text-xs text-gray-500">Alimentos, aseo y mas</p>
            </div>
            </NuxtLink>

            <!-- Navegación -->
            <div class="flex items-center gap-6">
            <button @click="scrollToSection('products')" class="flex items-center gap-2 text-gray-700 hover:text-[#E94E1B] font-medium transition-colors text-sm lg:text-base">
                <Package class="w-5 h-5" />
                Productos
            </button>
            <button @click="scrollToSection('combos')" class="flex items-center gap-2 text-gray-700 hover:text-[#E94E1B] font-medium transition-colors text-sm lg:text-base">
                <Store class="w-5 h-5" />
                Combos
            </button>
            <NuxtLink to="/cart" class="relative flex items-center gap-1 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-shadow">
                <ShoppingCart class="w-5 h-5" />
                Carrito
                <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ totalItems }}</span>
            </NuxtLink>
            </div>
        </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ShoppingCart, Store, Package } from 'lucide-vue-next';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const totalItems = computed(() => cartStore.totalItems);

const router = useRouter();
const route = useRoute();

const scrollToSection = (id: string) => {
    if (route.path !== '/') {
        router.push('/#' + id);
        return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Fallback si no carga el logo
const handleLogoError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    // Reemplazar con un div que tenga el gradiente y la letra C como fallback
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
        const fallback = document.createElement('div');
        fallback.className = 'w-10 h-10 bg-gradient-to-br from-[#E94E1B] to-[#F4A261] rounded-xl flex items-center justify-center shadow-lg';
        fallback.innerHTML = '<span class="text-white font-bold text-lg">C</span>';
        parent.insertBefore(fallback, img);
    }
};
</script>