<!-- components/ProductCard.vue -->
<template>
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="relative h-48 overflow-hidden">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" @error="handleImageError" />
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 font-bold text-[#E94E1B]">
            ${{ Number(product.price).toFixed(2) }}
        </div>
        <div v-if="product.category" class="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg">
            {{ product.category }}
        </div>
        </div>
        <div class="p-4">
        <h3 class="font-bold text-gray-800 mb-1">{{ product.name }}</h3>
        <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ product.description }}</p>
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
            <button @click="handleAdd" class="relative flex items-center gap-2 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-5 py-3 min-w-[160px] rounded-xl font-semibold text-sm justify-center hover:shadow-lg transition-shadow">
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

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image: string;
    category: string;
}

const props = defineProps<{ product: Product; index: number }>();
const quantity = ref(1);
const cartStore = useCartStore();

const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => { if (quantity.value > 1) quantity.value--; };

const handleAdd = () => {
    cartStore.addProduct(props.product, quantity.value);
    quantity.value = 1;
};

const handleImageError = (e: Event) => {
    (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/E94E1B/FFFFFF?text=Producto';
};
</script>