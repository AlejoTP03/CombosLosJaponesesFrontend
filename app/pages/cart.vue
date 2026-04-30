<!-- pages/cart.vue -->
<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Carrito vacío -->
        <div v-if="totalItems === 0" class="text-center py-20">
        <ShoppingCart class="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Tu carrito esta vacio</h2>
        <p class="text-gray-500 mb-8">Agrega productos o combos para realizar tu pedido.</p>
        <NuxtLink to="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-[#E94E1B] to-[#F4A261] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
            <ChevronRight class="w-5 h-5" />
            Ver Productos
        </NuxtLink>
        </div>

        <!-- Carrito con items -->
        <div v-else>
        <h1 class="text-2xl font-bold text-gray-800 mb-8">Tu Carrito</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Items -->
            <div class="lg:col-span-2 space-y-6">
            <!-- Productos -->
            <div v-if="cartStore.items.length > 0">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">🛍️ Productos</h2>
                <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
                <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-xl object-cover" @error="(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/80/E94E1B/FFFFFF?text=P'" />
                <div class="flex-1">
                    <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">${{ item.price.toFixed(2) }} c/u</p>
                </div>
                <div class="flex items-center gap-1">
                    <button @click="cartStore.updateQuantity('product', item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors">
                    <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity('product', item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors">
                    <Plus class="w-4 h-4" />
                    </button>
                </div>
                <div class="text-right min-w-[80px]">
                    <p class="font-bold text-[#E94E1B]">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
                <button @click="cartStore.removeItem('product', item.id)" class="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 class="w-5 h-5" />
                </button>
                </div>
            </div>

            <!-- Combos -->
            <div v-if="cartStore.combos.length > 0">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">🎁 Combos</h2>
                <div v-for="item in cartStore.combos" :key="item.id" class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
                <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-xl object-cover" @error="(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/80/E94E1B/FFFFFF?text=C'" />
                <div class="flex-1">
                    <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">${{ item.price.toFixed(2) }} c/u</p>
                    <p class="text-xs text-gray-400">{{ item.description }}</p>
                </div>
                <div class="flex items-center gap-1">
                    <button @click="cartStore.updateQuantity('combo', item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors">
                    <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity('combo', item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#E94E1B] transition-colors">
                    <Plus class="w-4 h-4" />
                    </button>
                </div>
                <div class="text-right min-w-[80px]">
                    <p class="font-bold text-[#E94E1B]">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
                <button @click="cartStore.removeItem('combo', item.id)" class="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 class="w-5 h-5" />
                </button>
                </div>
            </div>

            <button @click="cartStore.clearCart()" class="text-sm text-red-500 hover:text-red-700 font-medium">Vaciar carrito</button>
            </div>

            <!-- Formulario de checkout -->
            <div class="bg-white p-6 rounded-2xl shadow-lg h-fit w-full">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">📋 Informacion de Entrega</h2>

            <form @submit.prevent="handleSubmit" class="space-y-4 w-full">
                <div class="w-full">
                <Label class="mb-1.5 block">Nombre del destinatario *</Label>
                <Input v-model="form.recipientName" required placeholder="Nombre completo" class="rounded-xl h-11 w-full" />
                </div>

                <div class="w-full">
                <Label class="mb-1.5 block">Numero de contacto *</Label>
                <Input v-model="form.phone" type="tel" required placeholder="+53 5XXXXXXX" class="rounded-xl h-11 w-full" />
                </div>

                <div class="w-full">
                <Label class="mb-1.5 block">Municipio *</Label>
                <select v-model="municipality" required class="w-full h-11 rounded-xl border border-gray-200 shadow-sm focus:border-[#E94E1B] focus:ring-1 focus:ring-[#E94E1B] bg-transparent px-3 py-1 text-base outline-none">
                    <option value="">Seleccionar municipio</option>
                    <option v-for="m in municipalities" :key="m.value" :value="m.value">
                    {{ m.label }} {{ m.cost > 0 ? `(+$${m.cost} envio)` : '' }}
                    </option>
                </select>
                <p v-if="shippingCost > 0" class="text-xs text-amber-600 mt-1">Costo de envio: +${{ shippingCost }}</p>
                <p v-if="municipality === 'Sancti Spiritus'" class="text-xs text-green-600 mt-1">Envio gratis en Sancti Spiritus</p>
                </div>

                <div class="w-full">
                <Label class="mb-1.5 block">Direccion de entrega *</Label>
                <Textarea v-model="form.address" required rows="3" placeholder="Calle, numero, entre calles, reparto..." class="rounded-xl resize-none w-full" />
                </div>

                <div class="w-full">
                <Label class="mb-1.5 block">Metodo de pago *</Label>
                <div class="grid grid-cols-3 gap-2 w-full">
                    <button
                    v-for="method in paymentMethods"
                    :key="method"
                    type="button"
                    @click="form.paymentMethod = method"
                    :class="[
                        'px-3 py-2.5 rounded-xl text-sm font-medium transition-all border',
                        form.paymentMethod === method
                        ? 'border-[#E94E1B] bg-[#E94E1B]/10 text-[#E94E1B] shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-[#E94E1B]/50'
                    ]"
                    >
                    {{ method }}
                    </button>
                </div>
                </div>

                <!-- Resumen -->
                <div class="border-t pt-4 space-y-2 w-full">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Envio</span>
                    <span class="font-medium">{{ shippingCost === 0 ? 'Gratis' : '$' + shippingCost.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span class="text-[#E94E1B]">${{ total.toFixed(2) }}</span>
                </div>
                </div>

                <!-- Botón de WhatsApp con icono personalizado -->
                <button 
                    type="submit" 
                    class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    :disabled="!isFormValid"
                >
                    <img 
                        src="/whatsapp.jpg" 
                        alt="WhatsApp" 
                        class="w-5 h-5 object-contain"
                        @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                    />
                    Realizar Pedido por WhatsApp
                </button>
                <p class="text-xs text-gray-400 text-center">Seras redirigido a WhatsApp con el resumen de tu pedido.</p>
            </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Minus, Plus, Trash2, ShoppingCart, ChevronRight } from 'lucide-vue-next';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const totalItems = computed(() => cartStore.totalItems);
const subtotal = computed(() => cartStore.subtotal);

const municipalities = [
    { value: 'Sancti Spiritus', label: 'Sancti Spiritus', cost: 0 },
    { value: 'Zaza', label: 'Zaza del Medio', cost: 3 },
    { value: 'Taguasco', label: 'Taguasco', cost: 5 },
    { value: 'Cabaiguan', label: 'Cabaiguan', cost: 4 },
    { value: 'Guayos', label: 'Guayos', cost: 4 },
    { value: 'Jatibonico', label: 'Jatibonico', cost: 5 },
];

const paymentMethods = ['Zelle', 'Bizun', 'IBAN', 'USD', 'Euros'];

const municipality = ref('');
const form = ref({
    recipientName: '',
    phone: '',
    address: '',
    paymentMethod: '',
});

const shippingCost = computed(() => municipalities.find(m => m.value === municipality.value)?.cost || 0);
const total = computed(() => subtotal.value + shippingCost.value);

const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber;

const isFormValid = computed(() => {
    return form.value.recipientName && form.value.phone && municipality.value && form.value.address && form.value.paymentMethod;
});

const handleSubmit = () => {
    let message = `*NUEVO PEDIDO - Combos Los Japoneses*%0A%0A`;

    if (cartStore.items.length > 0) {
        message += `*Productos:*%0A`;
        cartStore.items.forEach(item => {
        message += `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}%0A`;
        });
    }

    if (cartStore.combos.length > 0) {
        message += `%0A*Combos:*%0A`;
        cartStore.combos.forEach(item => {
        message += `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}%0A`;
        });
    }

    message += `%0A*Resumen:*%0A`;
    message += `Subtotal: $${subtotal.value.toFixed(2)}%0A`;
    message += `Envio (${municipality.value}): ${shippingCost.value === 0 ? 'Gratis' : '$' + shippingCost.value.toFixed(2)}%0A`;
    message += `*TOTAL: $${total.value.toFixed(2)}*%0A%0A`;
    message += `*Datos de entrega:*%0A`;
    message += `Nombre: ${form.value.recipientName}%0A`;
    message += `Telefono: ${form.value.phone}%0A`;
    message += `Municipio: ${municipality.value}%0A`;
    message += `Direccion: ${form.value.address}%0A`;
    message += `Metodo de pago: ${form.value.paymentMethod}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};
</script>