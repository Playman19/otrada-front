// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxt/icon'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_API_URL || 'https://default-url.com',
      botApiUrl: process.env.VITE_BOT_API_URL || '',
      botApiToken: process.env.VITE_BOT_API_TOKEN || ''
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      meta: [
        { name: 'theme-color', content: '#000000' }
      ]
    }
  }
})
