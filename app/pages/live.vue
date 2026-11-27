<script setup>
useSeoMeta({
    title: `Live - ${SITE.name}`,
    description: 'Upcoming Ian Jamieson shows and where to catch him play.',
    ogTitle: `Live - ${SITE.name}`,
    ogDescription: 'Upcoming Ian Jamieson shows and where to catch him play.',
})
</script>

<template>
    <div class="space-y-4 text-center">
        <h1 class="text-2xl font-semibold text-white sm:text-3xl">Live</h1>
        <p class="mx-auto max-w-lg text-white/60">
            Upcoming shows. If you want me to play somewhere, get in touch.
        </p>
    </div>

    <UpcomingShows />
</template>
