<script setup>
useSeoMeta({
    title: `Live - ${SITE.name}`,
    description: 'Upcoming Ian Jamieson shows and where to catch him play.',
    ogTitle: `Live - ${SITE.name}`,
    ogDescription: 'Upcoming Ian Jamieson shows and where to catch him play.',
})

const loaded = ref(false)

onMounted(() => {
    const src = 'https://widget.bandsintown.com/main.min.js'
    if (document.querySelector(`script[src="${src}"]`)) {
        loaded.value = true
        return
    }
    const script = document.createElement('script')
    script.src = src
    script.charset = 'utf-8'
    script.async = true
    script.onload = () => { loaded.value = true }
    document.body.appendChild(script)
})
</script>

<template>
    <div class="space-y-4 text-center">
        <h1 class="text-2xl font-semibold text-white sm:text-3xl">Live</h1>
        <!-- TODO: your words. -->
        <p class="mx-auto max-w-lg text-white/60">
            Upcoming shows. If you want me to play somewhere, get in touch.
        </p>
    </div>

    <div class="min-h-[240px]">
        <a
            class="bit-widget-initializer"
            :data-artist-name="SITE.bandsintownArtist"
            data-display-local-dates="false"
            data-display-past-dates="true"
            data-auto-style="false"
            data-text-color="#FFFFFF"
            data-link-color="#FFFFFF"
            data-background-color="rgba(0,0,0,0)"
            data-display-limit="15"
            data-link-text-color="#000000"
            data-display-lineup="false"
            data-display-play-my-city="false"
            data-separator-color="rgba(255,255,255,0.12)"
        ></a>

        <p v-if="!loaded" class="text-center text-sm text-white/40">
            Loading dates...
        </p>
    </div>

    <p class="text-center text-sm text-white/50">
        Nothing showing?
        <NuxtLink to="/contact" class="text-white underline underline-offset-4 transition hover:text-white/70">
            Get in touch
        </NuxtLink>
        and I'll let you know what's coming up.
    </p>
</template>
