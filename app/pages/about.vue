<script setup>
const description = 'Ian Jamieson is an acoustic guitarist and songwriter known for his fingerstyle technique and heartfelt lyrics.'

useSeoMeta({
    title: `About - ${SITE.name}`,
    description,
    ogTitle: `About - ${SITE.name}`,
    ogDescription: description,
})
</script>

<template>
    <div class="space-y-4">
        <h1 class="text-center text-2xl font-semibold text-white sm:text-3xl">About</h1>

        <img
            src="/ian-jamieson-portrait.jpg"
            alt="Ian Jamieson playing harp at a song circle"
            width="900"
            height="1125"
            class="mx-auto w-full max-w-sm rounded-2xl border border-white/10 object-cover"
        >
    </div>

    <div class="mx-auto max-w-xl space-y-5 text-white/70">
        <p>
            Ian Jamieson is an acoustic guitarist and songwriter known for his fingerstyle
            technique and heartfelt lyrics. Gentle fingerpicked guitar and warm, melodic
            vocals guide you through stories of love, loss and life's simple truths.
            Authentic and grounded, every song is a window into a thoughtful heart. Perfect
            for quiet moments and meaningful listening.
        </p>
        <p>
            Alongside writing and performing his own music, he facilitates song circles,
            community music gatherings, jam sessions and workshops that invite people to
            explore their musicality in a relaxed and supportive environment.
        </p>
        <p>
            Drawing on simple songs, gentle guitar accompaniment, and moments of
            improvisation, Ian encourages participants to listen, harmonise, and take part at
            their own pace. His approach is informal and welcoming, with a focus on
            connection, creativity, and the shared experience of making music together.
        </p>
        <p>
            If you are interested to book Ian for an event then please
            <NuxtLink to="/contact" class="text-white underline underline-offset-4 transition hover:text-white/70">
                get in touch
            </NuxtLink>.
        </p>
    </div>
</template>
