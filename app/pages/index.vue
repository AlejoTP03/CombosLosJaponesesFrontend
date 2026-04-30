<!-- pages/index.vue -->
<template>
    <div>
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-br from-gray-50 to-orange-50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span class="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-[#E94E1B] shadow-md mb-6">
                <Truck class="w-4 h-4" />
                Envios a toda la provincia
                </span>
                <h1 class="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Los mejores combos <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#E94E1B] to-[#F4A261]">para su familia en cuba</span>
                </h1>
                <p class="text-lg text-gray-600 mb-8">
                Alimentos, aseo y todo lo que necesites directo a tu puerta. Calidad garantizada.
                </p>
                <div class="flex flex-wrap gap-4">
                <button @click="scrollTo('products')" class="bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow">
                    Ver Productos
                    <ChevronDown class="w-5 h-5" />
                </button>
                <NuxtLink to="/cart" class="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:border-[#E94E1B] hover:text-[#E94E1B] transition-all shadow-lg">
                    <ShoppingCart class="w-5 h-5" />
                    Mi Carrito
                    <span v-if="totalItems > 0" class="bg-[#E94E1B] text-white text-xs px-2 py-0.5 rounded-full">{{ totalItems }}</span>
                </NuxtLink>
                </div>
            </div>
            <div class="hidden lg:block">
                <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop"
                alt="Combo japonés"
                class="rounded-3xl shadow-2xl"
                @error="(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/E94E1B/FFFFFF?text=CLJ'"
                />
            </div>
            </div>
        </div>
        </section>

        <!-- Products Section -->
        <section id="products" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Selecciona los productos que deseas. Todos incluyen control de calidad y empacado seguro.</p>
            </div>

            <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton v-for="i in 8" :key="i" class="h-80 rounded-2xl" />
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="(product, i) in products" :key="product.id" :product="product" :index="i" />
            </div>
        </div>
        </section>

        <!-- Combos Section -->
        <section id="combos" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
            <span class="inline-flex items-center gap-2 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">Ahorra mas</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Combos Especiales</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Combinaciones perfectas con descuentos especiales. Mas productos, mas ahorro.</p>
            </div>

            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton v-for="i in 3" :key="i" class="h-96 rounded-2xl" />
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ComboCard v-for="(combo, i) in combos" :key="combo.id" :combo="combo" :index="i" />
            </div>
        </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(feat, i) in features" :key="i" class="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center" :class="feat.color">
                <component :is="feat.icon" class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ feat.title }}</h3>
                <p class="text-gray-600 text-sm">{{ feat.desc }}</p>
            </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { CheckCircle, Zap, DollarSign, ShoppingCart, ChevronDown, Truck } from 'lucide-vue-next';
import { useCartStore } from '~/stores/cart';
import { useApi } from '~/composables/useApi';

const { products, combos, loading } = useApi();
const cartStore = useCartStore();
const totalItems = computed(() => cartStore.totalItems);

const features = [
    { icon: CheckCircle, title: 'Calidad Garantizada', desc: 'Productos seleccionados y verificados para tu satisfaccion.', color: 'from-[#E94E1B] to-[#F4A261]' },
    { icon: Zap, title: 'Entrega Rapida', desc: 'Envios a toda la provincia de Sancti Spiritus.', color: 'from-[#2E7D9A] to-[#4a9eb8]' },
    { icon: DollarSign, title: 'Mejores Precios', desc: 'Combos con descuentos especiales para tu bolsillo.', color: 'from-[#F4A261] to-[#e9c46a]' },
];

const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>