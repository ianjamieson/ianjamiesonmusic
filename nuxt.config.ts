import { SITE } from './app/utils/site.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  nitro: {
    preset: 'cloudflare-pages',
    // Prerender every linked page to flat HTML so Pages serves static files.
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404'],
      // Live page temporarily hidden. app/pages/live.vue is untouched - delete
      // this line and uncomment the nav entry in app/layouts/default.vue to restore.
      ignore: ['/live'],
      // Write /live.html rather than /live/index.html so Cloudflare Pages serves
      // the URL directly instead of 308-redirecting to a trailing slash.
      autoSubfolderIndex: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB', class: 'scroll-smooth motion-reduce:scroll-auto' },
      meta: [
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})
