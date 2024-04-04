import path from 'path'
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue"
  ],
  css: ['~/assets/css/style.css'],
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { as: 'Wind', from: path.resolve(__dirname, './presets/wind/') },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://94.130.13.81:8085/api'
    }
  },
  devServer: {
    port: 8080
  }
})
