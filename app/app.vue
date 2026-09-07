<script setup>
const route = useRoute()
const canonical = computed(() => SITE.url + route.path)

useHead({
    link: [{ rel: 'canonical', href: canonical }],
})

useSeoMeta({
    ogSiteName: SITE.name,
    ogType: 'website',
    ogLocale: 'en_GB',
    ogImage: SITE.url + SITE.ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: canonical,
    twitterCard: 'summary_large_image',
    twitterImage: SITE.url + SITE.ogImage,
})

// Cloudflare Pages injects the Web Analytics beacon itself once you enable it in the
// dashboard, so nothing is needed here. Uncomment this (and cloudflareAnalyticsToken
// in app/utils/site.js) only to inject it manually instead.
// if (SITE.cloudflareAnalyticsToken) {
//     useHead({
//         script: [{
//             src: 'https://static.cloudflareinsights.com/beacon.min.js',
//             defer: true,
//             'data-cf-beacon': JSON.stringify({ token: SITE.cloudflareAnalyticsToken }),
//         }],
//     })
// }
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
