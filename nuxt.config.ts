import path from 'path'
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "YUMAX",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.svg" }],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    'nuxt-icon',
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
      baseUrl: 'https://api.yumaxpay.com/api'
    }
  },
})
