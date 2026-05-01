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

                <!-- Mensajes de error y éxito -->
                <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-sm">
                    {{ successMessage }}
                </div>

                <!-- Debug: Mostrar por qué está bloqueado (solo si está bloqueado) -->
                <div v-if="!isFormValid" class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-xs">
                    <p><strong>Por qué está bloqueado:</strong></p>
                    <ul class="list-disc ml-4 mt-1">
                        <li v-if="!(cartStore.items.length > 0 || cartStore.combos.length > 0)">❌ Carrito vacío (agrega productos o combos)</li>
                        <li v-if="!form.recipientName">❌ Falta: Nombre del destinatario</li>
                        <li v-if="!form.phone">❌ Falta: Número de contacto</li>
                        <li v-if="!municipality">❌ Falta: Selecciona un municipio</li>
                        <li v-if="!form.address">❌ Falta: Dirección de entrega</li>
                        <li v-if="!form.paymentMethod">❌ Falta: Método de pago</li>
                    </ul>
                </div>

                <!-- Botón de WhatsApp con icono personalizado -->
                <button 
                    type="submit"
                    class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    :disabled="!isFormValid || isLoading"
                >
                    <span v-if="isLoading" class="inline-block animate-spin">⏳</span>
                    <img 
                        v-if="!isLoading"
                        src="/whatsapp.jpg" 
                        alt="WhatsApp" 
                        class="w-5 h-5 object-contain"
                        @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                    />
                    {{ isLoading ? 'Procesando...' : 'Realizar Pedido por WhatsApp' }}
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
import { Input, Textarea, Label } from '../components/ui';

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

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const shippingCost = computed(() => municipalities.find(m => m.value === municipality.value)?.cost || 0);
const total = computed(() => subtotal.value + shippingCost.value);

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const whatsappNumber = config.public.whatsappNumber;

const isFormValid = computed(() => {
    return !!(
        cartStore.items.length > 0 || cartStore.combos.length > 0
    ) && !!(
        form.value.recipientName && 
        form.value.phone && 
        municipality.value && 
        form.value.address && 
        form.value.paymentMethod
    );
});

const generateWhatsAppMessage = () => {
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

    return message;
};

const handleSubmit = async () => {
    errorMessage.value = '';
    successMessage.value = '';
    isLoading.value = true;

    try {
        // Validar que hay items en el carrito
        if (!cartStore.items.length && !cartStore.combos.length) {
            throw new Error('El carrito está vacío');
        }

        // Preparar datos del pedido
        const orderData = {
            recipientName: form.value.recipientName,
            phone: form.value.phone,
            municipality: municipality.value,
            address: form.value.address,
            paymentMethod: form.value.paymentMethod,
            subtotal: subtotal.value,
            shippingCost: shippingCost.value,
            total: total.value,
            items: cartStore.items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            combos: cartStore.combos.map(combo => ({
                id: combo.id,
                quantity: combo.quantity,
                price: combo.price
            }))
        };

        // Crear el pedido en la BD
        const response = await fetch(`${apiBase}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear el pedido');
        }

        const result = await response.json();
        
        // Mostrar mensaje de éxito
        successMessage.value = '✅ Pedido creado exitosamente. Se abrirá WhatsApp para confirmar...';
        
        // Esperar un momento y luego abrir WhatsApp
        setTimeout(() => {
            const message = generateWhatsAppMessage();
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            // Limpiar el carrito después de crear el pedido
            setTimeout(() => {
                cartStore.clearCart();
                form.value = { recipientName: '', phone: '', address: '', paymentMethod: '' };
                municipality.value = '';
                successMessage.value = '';
            }, 500);
        }, 1500);

    } catch (error: any) {
        errorMessage.value = `❌ ${error.message || 'Error al procesar el pedido'}`;
    } finally {
        isLoading.value = false;
    }
};
</script>