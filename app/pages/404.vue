<script setup>
// Prerendered to dist/404.html, which Cloudflare Pages serves for unknown URLs
// with a 404 status. Static content, so it reads correctly before JS boots.
useSeoMeta({
    title: `Page not found - ${SITE.name}`,
    robots: 'noindex',
})
</script>

<template>
    <div class="space-y-6 py-10 text-center">
        <p class="text-6xl font-semibold text-white/20">404</p>
        <h1 class="text-2xl font-semibold text-white">That page does not exist</h1>
        <p class="mx-auto max-w-md text-white/60">
            The link might be old, or there could be a typo in the address.
        </p>
        <NuxtLink
            to="/"
            class="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
        >
            Back home
        </NuxtLink>
    </div>
</template>
