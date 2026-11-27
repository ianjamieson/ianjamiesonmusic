<script setup>
const links = [
    { to: '/', label: 'Home' },
    { to: '/upcoming-shows', label: 'Upcoming Shows' },
    { to: '/about', label: 'About' },
    { to: '/book', label: 'Lessons' },
    { to: '/contact', label: 'Contact' },
]

const route = useRoute()
const normalise = path => path.replace(/\/+$/, '') || '/'
const isActive = to => normalise(route.path) === normalise(to)

const open = ref(false)
const stuck = ref(false)
const sentinel = ref(null)
let observer

// Close the mobile menu whenever the page changes.
watch(() => route.path, () => { open.value = false })

onMounted(() => {
    if (!('IntersectionObserver' in window) || !sentinel.value) return
    observer = new IntersectionObserver(
        ([entry]) => { stuck.value = !entry.isIntersecting },
        { threshold: 0 },
    )
    observer.observe(sentinel.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
    <div class="relative min-h-dvh text-white">
        <div aria-hidden="true" class="fixed inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

        <div class="relative">
            <header class="px-6 pb-6 pt-10 text-center">
                <NuxtLink to="/" class="inline-block" aria-label="Ian Jamieson - home">
                    <img
                        src="/ian-jamieson.png"
                        alt="Ian Jamieson"
                        width="140"
                        height="88"
                        class="w-[120px] sm:w-[140px]"
                    >
                </NuxtLink>
            </header>

            <!-- Watched to tell when the bar below has stuck to the top. -->
            <div ref="sentinel" aria-hidden="true" class="h-px"></div>

            <div
                class="sticky top-0 z-50 border-b transition-colors duration-300"
                :class="stuck ? 'border-white/10 bg-black/70 backdrop-blur' : 'border-transparent'"
            >
                <div class="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-3 sm:px-12 md:justify-center">
                    <NuxtLink
                        to="/"
                        class="transition-opacity duration-300 md:hidden"
                        :class="stuck ? 'opacity-100' : 'pointer-events-none opacity-0'"
                        :tabindex="stuck ? undefined : -1"
                        aria-label="Ian Jamieson - home"
                    >
                        <img src="/ian-jamieson.png" alt="" width="64" height="40" class="w-[64px]">
                    </NuxtLink>

                    <nav class="hidden md:block" aria-label="Main">
                        <ul class="flex items-center gap-1">
                            <li v-for="link in links" :key="link.to">
                                <NuxtLink
                                    :to="link.to"
                                    class="block rounded-md px-4 py-2 text-sm transition"
                                    :class="isActive(link.to) ? 'text-white' : 'text-white/50 hover:text-white'"
                                    :aria-current="isActive(link.to) ? 'page' : undefined"
                                >
                                    {{ link.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <button
                        type="button"
                        class="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 md:hidden"
                        :aria-expanded="open"
                        aria-controls="mobile-nav"
                        :aria-label="open ? 'Close menu' : 'Open menu'"
                        @click="open = !open"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="h-6 w-6">
                            <path v-if="open" d="M6 6l12 12M18 6L6 18" />
                            <path v-else d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>
                </div>

                <nav
                    v-show="open"
                    id="mobile-nav"
                    class="border-t border-white/10 bg-black/80 backdrop-blur md:hidden"
                    aria-label="Main"
                >
                    <ul class="mx-auto w-full max-w-3xl px-6 py-2 sm:px-12">
                        <li v-for="link in links" :key="link.to">
                            <NuxtLink
                                :to="link.to"
                                class="-mx-3 block rounded-md px-3 py-3.5 text-base transition"
                                :class="isActive(link.to) ? 'text-white' : 'text-white/60 hover:text-white'"
                                :aria-current="isActive(link.to) ? 'page' : undefined"
                            >
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <main>
                <div class="mx-auto w-full max-w-3xl space-y-12 px-6 py-12 sm:px-12">
                    <slot />
                </div>
            </main>

            <SiteFooter />
        </div>
    </div>
</template>
