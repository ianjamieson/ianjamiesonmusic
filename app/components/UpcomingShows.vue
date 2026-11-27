<script setup>
import { upcomingShows, formatShowDate, showDateTime } from '~/data/upcoming-shows.js'

const props = defineProps({
    // 0 shows the full list. A positive limit is the home-page preview.
    limit: {
        type: Number,
        default: 0,
    },
})

// Generated with the page, then reused from the payload. The browser does not
// call Bandsintown itself.
const { data } = await useAsyncData('upcoming-shows', () => upcomingShows(), {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
})

const all = computed(() => data.value ?? [])
const shows = computed(() => (props.limit > 0 ? all.value.slice(0, props.limit) : all.value))
const hasMore = computed(() => props.limit > 0 && all.value.length > shows.value.length)
</script>

<template>
    <p v-if="!shows.length" class="text-center text-sm text-white/50">
        Nothing showing?
        <NuxtLink to="/contact" class="text-white underline underline-offset-4 transition hover:text-white/70">
            Get in touch
        </NuxtLink>
        and I'll let you know what's coming up.
    </p>

    <div v-else>
        <ul class="divide-y divide-white/10">
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

        <p v-if="hasMore" class="pt-5 text-center text-sm">
            <NuxtLink to="/live" class="text-white underline underline-offset-4 transition hover:text-white/70">
                All shows
            </NuxtLink>
        </p>
    </div>
</template>
