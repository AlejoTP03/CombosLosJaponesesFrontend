// composables/useApi.ts
import { ref, onMounted } from 'vue';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image: string;
    category: string;
}

interface Combo {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image: string;
    discount?: number;
    products?: { id: number; name: string }[];
}

export function useApi() {
    const products = ref<Product[]>([]);
    const combos = ref<Combo[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const config = useRuntimeConfig();
    const API_BASE = config.public.apiBase;

    onMounted(async () => {
        try {
        const [productsRes, combosRes] = await Promise.all([
            fetch(`${API_BASE}/products`),
            fetch(`${API_BASE}/combos`),
        ]);

        if (!productsRes.ok || !combosRes.ok) {
            throw new Error('Error al cargar datos');
        }

        products.value = await productsRes.json();
        combos.value = await combosRes.json();
        } catch (err: any) {
        error.value = err.message;
        // Datos demo como fallback (igual que el proyecto original)
        products.value = [
            { id: 1, name: 'Arroz Blanco Premium', description: 'Arroz de grano largo, perfecto para acompanar cualquier comida japonesa. Bolsa de 5kg.', price: 12.00, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 2, name: 'Salsa de Soya', description: 'Salsa de soya artesanal, ideal para sushi y marinados. Botella de 500ml.', price: 5.50, image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 3, name: 'Fideos Udon', description: 'Fideos udon tradicionales, gruesos y suaves. Paquete de 3 porciones.', price: 4.25, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 4, name: 'Pan Bao', description: 'Panecillos al vapor, suaves y esponjosos. Pack de 6 unidades.', price: 6.00, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 5, name: 'Aceite de Sesamo', description: 'Aceite de sesamo tostado, aromatizante para ensaladas y salteados. 250ml.', price: 7.80, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 6, name: 'Wasabi en Pasta', description: 'Wasabi tradicional en tubo, picante y aromatico. 43g.', price: 3.50, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 7, name: 'Galletas de Arroz', description: 'Galletas crujientes de arroz integrales. Pack de 20 unidades.', price: 4.00, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop', category: 'alimentos' },
            { id: 8, name: 'Te Verde Matcha', description: 'Te verde matcha en polvo, organico y ceremonial. Lata de 50g.', price: 15.00, image: 'https://images.unsplash.com/photo-1515814472071-4d6328e35d6e?w=400&h=300&fit=crop', category: 'bebidas' },
            { id: 9, name: 'Jabon de Arroz', description: 'Jabon artesanal con extracto de arroz, hidratante y suavizante. 100g.', price: 3.00, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=300&fit=crop', category: 'aseo' },
            { id: 10, name: 'Shampoo de Tsubaki', description: 'Shampoo con aceite de camelia japonesa, revitalizante. 400ml.', price: 9.50, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop', category: 'aseo' },
            { id: 11, name: 'Detergente Multiusos', description: 'Detergente liquido concentrado, fragancia floral. 1L.', price: 4.50, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop', category: 'aseo' },
            { id: 12, name: 'Papel Higienico Premium', description: 'Papel higienico ultra suave, 4 rollos de doble hoja.', price: 5.00, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop', category: 'aseo' },
        ];
        combos.value = [
            { id: 1, name: 'Combo Familiar Oriental', description: 'El combo perfecto para toda la familia. Incluye arroz, salsa de soya, fideos udon y pan bao.', price: 25.00, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', products: [{ id: 1, name: 'Arroz' }, { id: 2, name: 'Salsa de Soya' }, { id: 3, name: 'Fideos Udon' }] },
            { id: 2, name: 'Combo Sushi Lover', description: 'Todo lo que necesitas para preparar sushi en casa. Arroz, salsa de soya, wasabi y aceite de sesamo.', price: 28.00, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', products: [{ id: 1, name: 'Arroz' }, { id: 2, name: 'Salsa' }, { id: 6, name: 'Wasabi' }] },
            { id: 3, name: 'Combo Spa en Casa', description: 'Relajate con nuestros productos de cuidado personal. Jabon de arroz, shampoo y detergente.', price: 15.00, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6a?w=400&h=300&fit=crop', products: [{ id: 9, name: 'Jabon' }, { id: 10, name: 'Shampoo' }, { id: 11, name: 'Detergente' }] },
            { id: 4, name: 'Combo Desayuno Japon', description: 'Inicia tu dia al estilo japones. Te matcha, galletas de arroz y pan bao.', price: 22.00, image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&h=300&fit=crop', products: [{ id: 8, name: 'Te Matcha' }, { id: 7, name: 'Galletas' }, { id: 4, name: 'Pan Bao' }] },
            { id: 5, name: 'Combo Aseo Completo', description: 'Todo para el hogar. Detergente, papel higienico, jabon y shampoo.', price: 18.00, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop', products: [{ id: 11, name: 'Detergente' }, { id: 12, name: 'Papel' }, { id: 9, name: 'Jabon' }] },
        ];
        } finally {
        loading.value = false;
        }
});

    return { products, combos, loading, error };
}