// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	modules: ['@nuxt/hints', '@nuxt/eslint', 'shadcn-nuxt', '@nuxt/icon'],
	devtools: { enabled: true },
	css: ['~/assets/css/tailwind.css', '~/assets/css/index.css'],
	runtimeConfig: {
		apiSecret: '',
		public: {
			apiBase: '',
		},
	},
	compatibilityDate: '2025-07-15',
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	eslint: {
		config: {
			stylistic: {
				semi: false,
				quotes: 'single',
				commaDangle: 'always-multiline',
				indent: 'tab',
			},
		},
	},
	icon: {
		serverBundle: {
			collections: ['material-symbols-light'],
		},
	},
	shadcn: {
		/**
     * Prefix for all the imported component.
     * @default "Ui"
     */
		prefix: '',
		/**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
		componentDir: '@/components/ui',
	},
})
