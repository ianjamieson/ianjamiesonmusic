<script setup>
useSeoMeta({
    title: `Guitar & Songwriting Lessons - ${SITE.name}`,
    description: `One to one, in person guitar and songwriting lessons in ${SITE.lesson.location}. ${SITE.lesson.duration}, ${SITE.lesson.price}.`,
    ogTitle: `Guitar & Songwriting Lessons - ${SITE.name}`,
    ogDescription: `One to one, in person guitar and songwriting lessons in ${SITE.lesson.location}.`,
})

const ns = SITE.calNamespace

onMounted(() => {
    // Official Cal.com embed loader.
    (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar) }
        let d = C.document
        C.Cal = C.Cal || function () {
            let cal = C.Cal
            let ar = arguments
            if (!cal.loaded) {
                cal.ns = {}
                cal.q = cal.q || []
                d.head.appendChild(d.createElement('script')).src = A
                cal.loaded = true
            }
            if (ar[0] === L) {
                const api = function () { p(api, arguments) }
                const namespace = ar[1]
                api.q = api.q || []
                if (typeof namespace === 'string') {
                    cal.ns[namespace] = cal.ns[namespace] || api
                    p(cal.ns[namespace], ar)
                    p(cal, ['initNamespace', namespace])
                } else {
                    p(cal, ar)
                }
                return
            }
            p(cal, ar)
        }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    window.Cal('init', ns, { origin: 'https://app.cal.com' })
    window.Cal.config = window.Cal.config || {}
    window.Cal.config.forwardQueryParams = true

    window.Cal.ns[ns]('inline', {
        elementOrSelector: '#cal-inline',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: SITE.calLink,
    })

    window.Cal.ns[ns]('ui', {
        // Matched to the site: white accents on the dark theme, gray-900 on light.
        cssVarsPerTheme: {
            light: { 'cal-brand': '#111827' },
            dark: { 'cal-brand': '#ffffff' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
    })
})
</script>

<template>
    <div class="space-y-4 text-center">
        <h1 class="text-2xl font-semibold text-white sm:text-3xl">Lessons</h1>
        <p class="mx-auto max-w-lg text-white/60">
            If you are interested to book a one to one in person guitar or songwriting
            lesson with me, then please find a slot in my calendar below.
        </p>
    </div>

    <div id="cal-inline" class="min-h-[600px] w-full overflow-hidden rounded-xl"></div>
</template>
