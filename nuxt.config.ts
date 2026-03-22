// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    baseURL: '/microjam055/',
    head: {
      link: [{ rel: 'stylesheet', href: 'main.css' }],
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    'v-gsap-nuxt',
    '@vueuse/nuxt',
    '@hypernym/nuxt-anime'
  ]
})