// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare-pages'
  },
  modules: ["@nuxt/content", "@nuxthq/studio", "@nuxt/image", "@nuxtjs/tailwindcss"]
})