<script setup>
useSeoMeta({
    title: `${SITE.name} - Acoustic guitarist, songwriter and teacher, Portsmouth`,
    description: SITE.description,
    ogTitle: SITE.name,
    ogDescription: SITE.description,
})

</script>

<template>
    <section id="listen" class="scroll-mt-24 space-y-5">
        <h2 class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Listen
        </h2>
        <iframe
            title="Ian Jamieson on Spotify"
            style="border-radius:12px"
            :src="`https://open.spotify.com/embed/artist/${SITE.spotifyArtistId}?utm_source=generator&theme=0`"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    </section>

    <section class="flex flex-col items-center gap-4">
        <h2 class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Vinyl EP
        </h2>
        <a :href="SITE.vinylUrl" class="group relative inline-block" aria-label="Buy the Ian Jamieson vinyl EP">
            <picture>
                <source srcset="/ianjamieson-vinyl-ep.webp" type="image/webp">
                <img
                    src="/ianjamieson-vinyl-ep.png"
                    alt="Ian Jamieson vinyl EP"
                    width="600"
                    height="400"
                    class="rounded-xl"
                >
            </picture>
            <span class="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-black shadow-lg backdrop-blur transition group-hover:bg-white">
                Buy now
            </span>
        </a>
    </section>
</template>
