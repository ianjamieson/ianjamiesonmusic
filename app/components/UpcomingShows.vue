<script setup>
import { upcomingShows, formatShowDate, showDateTime } from '~/data/upcoming-shows.js'

// Generated with the page, then reused from the payload. The browser does not
// call Bandsintown itself.
const { data } = await useAsyncData('upcoming-shows', () => upcomingShows(), {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
})

const shows = computed(() => data.value ?? [])
</script>

<template>
    <p v-if="!shows.length" class="text-center text-sm text-white/50">
        Nothing showing?
        <NuxtLink to="/contact" class="text-white underline underline-offset-4 transition hover:text-white/70">
            Get in touch
        </NuxtLink>
        and I'll let you know what's coming up.
    </p>

    <ul v-else class="divide-y divide-white/10">
        <li
            v-for="show in shows"
            :key="`${show.start}-${show.title}`"
            class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
            <time
                :datetime="showDateTime(show)"
                class="text-sm text-white/50 sm:w-64 sm:shrink-0 sm:whitespace-nowrap"
            >
                {{ formatShowDate(show) }}
            </time>
            <div class="min-w-0">
                <p class="text-white">{{ show.title }}</p>
                <p v-if="show.place || show.tickets" class="text-sm text-white/50">
                    <span v-if="show.place">{{ show.place }}</span>
                    <a
                        v-if="show.tickets"
                        :href="show.tickets"
                        class="text-white underline underline-offset-4 transition hover:text-white/70"
                        :class="show.place ? 'ml-3' : ''"
                        :aria-label="`Tickets for ${show.title}`"
                    >Tickets</a>
                </p>
            </div>
        </li>
    </ul>
</template>
