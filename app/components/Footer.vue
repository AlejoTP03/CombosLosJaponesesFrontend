<!-- components/Footer.vue -->
<template>
    <footer class="bg-gray-900 text-gray-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Marca -->
            <div>
            <div class="flex items-center gap-3 mb-4">
                <img 
                    src="/logo.jpg" 
                    alt="Combos Los Japoneses" 
                    class="w-10 h-10 rounded-xl object-cover shadow-lg"
                    @error="handleLogoError"
                />
                <h3 class="text-xl font-bold text-white">Combos Los Japoneses</h3>
            </div>
            <p class="text-gray-400">Alimentos, aseo y lo que necesites. Productos de calidad directo a tu puerta.</p>
            </div>

            <!-- Contacto -->
            <div>
            <h4 class="text-lg font-semibold text-white mb-4">📞 Contacto</h4>
            <div class="space-y-2">
                <div class="flex items-center gap-2"><MapPin class="w-4 h-4 text-[#E94E1B]" /> Sancti Spiritus, Cuba</div>
                <div class="flex items-center gap-2"><Phone class="w-4 h-4 text-[#E94E1B]" /> WhatsApp: +53 5XXXXXXX</div>
                <div class="flex items-center gap-2"><Truck class="w-4 h-4 text-[#E94E1B]" /> Entregas en toda la provincia</div>
            </div>
            </div>

            <!-- Zonas de entrega -->
            <div>
            <h4 class="text-lg font-semibold text-white mb-4">🚚 Zonas de Entrega</h4>
            <ul class="space-y-1 text-gray-400">
                <li>• Sancti Spiritus</li>
                <li>• Zaza del Medio</li>
                <li>• Taguasco</li>
                <li>• Cabaiguan</li>
                <li>• Guayos</li>
                <li>• Jatibonico</li>
            </ul>
            </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            © {{ new Date().getFullYear() }} Combos Los Japoneses. Todos los derechos reservados.
        </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { MapPin, Phone, Truck } from 'lucide-vue-next';

// Fallback si no carga el logo
const handleLogoError = (e: Event) => {
    const img = e.target as HTMLImageElement;
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