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

  const API_BASE = 'http://localhost:3001/api';
  const API_URL = 'http://localhost:3001'; // URL base para las imágenes

  const fixImageUrl = (imagePath: string | null) => {
    if (!imagePath) return 'https://placehold.co/400x300/E94E1B/FFFFFF?text=Producto';
    
    // Si la imagen ya tiene una URL completa, devolverla tal cual
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Si es una ruta relativa (/uploads/...), agregar la URL del backend
    if (imagePath.startsWith('/')) {
      return `${API_URL}${imagePath}`;
    }
    
    // Si no tiene / al inicio, agregarlo
    return `${API_URL}/${imagePath}`;
  };

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      console.log('🔍 Conectando al backend:', API_BASE);
      
      const [productsRes, combosRes] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/combos`),
      ]);

      console.log('📡 Products response status:', productsRes.status);
      console.log('📡 Combos response status:', combosRes.status);

      if (!productsRes.ok) {
        throw new Error(`Error al cargar productos (${productsRes.status})`);
      }

      if (!combosRes.ok) {
        throw new Error(`Error al cargar combos (${combosRes.status})`);
      }

      const productsData = await productsRes.json();
      const combosData = await combosRes.json();

      console.log('📦 Datos recibidos - Productos:', productsData);
      console.log('📦 Datos recibidos - Combos:', combosData);

      // Corregir las URLs de las imágenes
      products.value = (productsData.Productos || []).map((product: Product) => ({
        ...product,
        image: fixImageUrl(product.image)
      }));
      
      combos.value = (combosData.Combos || []).map((combo: Combo) => ({
        ...combo,
        image: fixImageUrl(combo.image)
      }));

      console.log('✅ Productos cargados:', products.value.length);
      console.log('✅ Combos cargados:', combos.value.length);
      console.log('🖼️ Ejemplo de imagen:', products.value[0]?.image);

    } catch (err: any) {
      console.error('❌ Error al cargar datos:', err);
      error.value = err.message || 'Error al conectar con el servidor';
      products.value = [];
      combos.value = [];
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  const refresh = () => {
    fetchData();
  };

  return { 
    products, 
    combos, 
    loading, 
    error,
    refresh 
  };
}