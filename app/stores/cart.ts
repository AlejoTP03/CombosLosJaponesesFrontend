// stores/cart.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartCombo {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([]);
    const combos = ref<CartCombo[]>([]);

    // Cargar del localStorage al iniciar (solo en cliente)
    const loadFromStorage = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('cart-storage');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    items.value = parsed.items || [];
                    combos.value = parsed.combos || [];
                } catch (e) {
                    console.error('Error parsing cart from localStorage', e);
                }
            }
        }
    };

    // Llamar al cargar el store
    loadFromStorage();

  // Guardar en localStorage cada vez que cambie
function persist() {
    if (import.meta.client) {
        localStorage.setItem('cart-storage', JSON.stringify({ items: items.value, combos: combos.value }));
    }
}

function addProduct(product: any, quantity: number = 1) {
    const existing = items.value.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        items.value.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            quantity,
        });
    }
    persist();
}

function addCombo(combo: any, quantity: number = 1) {
    const existing = combos.value.find(item => item.id === combo.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        combos.value.push({
        id: combo.id,
        name: combo.name,
        price: parseFloat(combo.price),
        image: combo.image,
        description: combo.description,
        quantity,
    });
    }
    persist();
}

function updateQuantity(type: 'product' | 'combo', id: number, quantity: number) {
    if (quantity <= 0) {
    removeItem(type, id);
    return;
    }
    if (type === 'product') {
    const item = items.value.find(i => i.id === id);
    if (item) item.quantity = quantity;
    } else {
    const item = combos.value.find(i => i.id === id);
    if (item) item.quantity = quantity;
    }
    persist();
}

function removeItem(type: 'product' | 'combo', id: number) {
    if (type === 'product') {
        items.value = items.value.filter(item => item.id !== id);
    } else {
        combos.value = combos.value.filter(item => item.id !== id);
    }
    persist();
}

function clearCart() {
    items.value = [];
    combos.value = [];
    persist();
}

const totalItems = computed(() => {
    const productCount = items.value.reduce((sum, item) => sum + item.quantity, 0);
    const comboCount = combos.value.reduce((sum, combo) => sum + combo.quantity, 0);
    return productCount + comboCount;
});

const subtotal = computed(() => {
    const productTotal = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const comboTotal = combos.value.reduce((sum, combo) => sum + combo.price * combo.quantity, 0);
    return productTotal + comboTotal;
});

    return { items, combos, addProduct, addCombo, updateQuantity, removeItem, clearCart, totalItems, subtotal };
});