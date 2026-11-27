<script setup>
import { upcomingShows, formatShowDate, showDateTime } from '~/data/upcoming-shows.js'

const props = defineProps({
    // 0 shows the full list. A positive limit is the home-page preview.
    limit: {
        type: Number,
        default: 0,
    },
})

const all = computed(() => upcomingShows())
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
                    <p v-if="show.place" class="text-sm text-white/50">{{ show.place }}</p>
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
