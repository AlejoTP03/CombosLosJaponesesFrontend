<!-- components/ComboCard.vue -->
<template>
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="relative">
        <div class="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            Combo
        </div>
        <div v-if="combo.discount && combo.discount > 0" class="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-1 rounded-xl text-xs font-bold">
            -{{ combo.discount }}%
        </div>
        <img :src="combo.image" :alt="combo.name" class="w-full h-48 object-cover" @error="handleImageError" />
        </div>
        <div class="p-4">
        <div class="flex items-center justify-between mb-2">
            <div class="text-lg font-bold text-[#E94E1B]">${{ Number(combo.price).toFixed(2) }}</div>
            <span class="text-xs text-gray-400">Precio especial</span>
        </div>
        <h3 class="font-bold text-gray-800 mb-1">{{ combo.name }}</h3>
        <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ combo.description }}</p>

        <!-- Productos incluidos -->
        <div v-if="combo.products && combo.products.length > 0" class="mb-4">
            <div class="text-xs font-medium text-gray-400 mb-1">Incluye:</div>
            <div class="flex flex-wrap gap-1">
            <span v-for="product in combo.products.slice(0, 4)" :key="product.id" class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {{ product.name }}
            </span>
            <span v-if="combo.products.length > 4" class="text-xs text-gray-400">+{{ combo.products.length - 4 }} mas</span>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button @click="decrementQuantity" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors rounded-l-xl">
                <Minus class="w-4 h-4" />
            </button>
            <span class="w-10 text-center text-sm font-medium">{{ quantity }}</span>
            <button @click="incrementQuantity" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors rounded-r-xl">
                <Plus class="w-4 h-4" />
            </button>
            </div>
            <!-- Botón corregido: mismo estilo que el Navbar -->
            <button @click="handleAdd" class="relative flex items-center gap-1.5 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-shadow">
                <ShoppingCart class="w-4 h-4" />
                Agregar
            </button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Minus, Plus, ShoppingCart } from 'lucide-vue-next';
import { useCartStore } from '~/stores/cart';

interface Combo {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image: string;
    discount?: number;
    products?: { id: number; name: string }[];
}

const props = defineProps<{ combo: Combo; index: number }>();
const quantity = ref(1);
const cartStore = useCartStore();

const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => { if (quantity.value > 1) quantity.value--; };

const handleAdd = () => {
    cartStore.addCombo(props.combo, quantity.value);
    quantity.value = 1;
};

const handleImageError = (e: Event) => {
    (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/E94E1B/FFFFFF?text=Combo';
};
</script>