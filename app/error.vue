<script setup>
const props = defineProps({
    error: { type: Object, default: () => ({}) },
})

const isMissing = computed(() => props.error?.statusCode === 404)

useHead({
    title: `${isMissing.value ? 'Page not found' : 'Something went wrong'} - ${SITE.name}`,
    meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
    <NuxtLayout>
        <div class="space-y-6 py-10 text-center">
            <p class="text-6xl font-semibold text-white/20">
                {{ error?.statusCode || 500 }}
            </p>
            <h1 class="text-2xl font-semibold text-white">
                {{ isMissing ? 'That page does not exist' : 'Something went wrong' }}
            </h1>
            <p class="mx-auto max-w-md text-white/60">
                {{ isMissing
                    ? 'The link might be old, or there could be a typo in the address.'
                    : 'Try again in a moment. If it keeps happening, let me know.' }}
            </p>
            <button
                type="button"
                class="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                @click="clearError({ redirect: '/' })"
            >
                Back home
            </button>
        </div>
    </NuxtLayout>
</template>
