import path from 'path'
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: 'YUMAX',
			link: [{ rel: 'icon', type: 'image/png', href: '/favicon.svg' }],
		},
	},
	modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'nuxt-primevue',
		'nuxt-icon',
		'@nuxtjs/i18n',
	],
	css: ['~/assets/css/style.css', 'primeicons/primeicons.css'],
	primevue: {
		options: {
			unstyled: true,
		},
		importPT: { as: 'Wind', from: path.resolve(__dirname, './presets/wind/') },
		cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
	},
	runtimeConfig: {
		public: {
			baseUrl: 'https://api.yumaxpay.com/api',
		},
	},
	i18n: {
		lazy: true,
		langDir: 'locales',
		defaultLocale: 'en',
		strategy: 'prefix_except_default',
		locales: [
			{ code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
			{ code: 'ua', iso: 'uk-UA', file: 'ua.json', name: 'Українська' },
		],
	},
})
