<script setup>
useSeoMeta({
    title: `Upcoming Shows - ${SITE.name}`,
    description: 'Upcoming Ian Jamieson shows and where to catch him play.',
    ogTitle: `Upcoming Shows - ${SITE.name}`,
    ogDescription: 'Upcoming Ian Jamieson shows and where to catch him play.',
})
</script>

<template>
    <div class="space-y-4 text-center">
        <h1 class="text-2xl font-semibold text-white sm:text-3xl">Upcoming Shows</h1>
        <p class="mx-auto max-w-lg text-white/60">
            If you want me to play somewhere, get in touch.
        </p>
    </div>

    <UpcomingShows />
</template>
