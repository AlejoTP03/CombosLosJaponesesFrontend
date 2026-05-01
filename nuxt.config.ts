import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["node"]
      }
    }
  },

  vite: {
    plugins: [tailwindcss()],

    server: {
      allowedHosts: [
        ''  // El dominio que te dio localtunnel
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3001/api",
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER || "53500460",
    },
  },

})
