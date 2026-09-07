<script setup>
const description = 'Get in touch with Ian Jamieson about booking him for an event.'

useSeoMeta({
    title: `Contact - ${SITE.name}`,
    description,
    ogTitle: `Contact - ${SITE.name}`,
    ogDescription: description,
})
</script>

<template>
    <div class="space-y-4 text-center">
        <h1 class="text-2xl font-semibold text-white sm:text-3xl">Contact</h1>
        <p class="mx-auto max-w-lg text-white/60">
            If you are interested to book me for an event then please get in touch on the
            email below.
        </p>
    </div>

    <div class="flex justify-center">
        <a
            :href="`mailto:${SITE.email}`"
            class="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
            {{ SITE.email }}
        </a>
    </div>
</template>
