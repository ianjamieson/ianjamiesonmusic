<template>
    <div class="relative h-screen overflow-hidden">
        <div aria-hidden="true" class="fixed inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <main class="relative z-10 flex h-full items-start justify-center overflow-y-auto">
            <div class="w-full lg:w-1/2 space-y-12 px-6 sm:px-12 py-12">
                <img src="/ian-jamieson.png" alt="Ian Jamieson" class="mx-auto max-w-[300px] w-full">
                <iframe data-testid="embed-iframe" title="Ian Jamieson on Spotify" style="border-radius:12px" src="https://open.spotify.com/embed/artist/2q2E2GheKlqjEBXPUEAcNR?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                <div class="flex items-center gap-4" aria-hidden="true">
                    <div class="h-px flex-1 bg-white/15"></div>
                    <div class="h-2 w-2 rounded-full bg-white/30"></div>
                    <div class="h-px flex-1 bg-white/15"></div>
                </div>

                <div class="flex flex-col items-center gap-3">
                    <p class="text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                        Ian Jamieson - Vinyl EP
                    </p>
                    <div class="relative inline-block">
                        <img src="/ianjamieson-vinyl-ep.png" alt="Ian Jamieson Vinyl EP" />
                        <a
                            href="https://elasticstage.com/ian-jamieson/releases/ep-singleep"
                            class="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-black shadow-lg backdrop-blur transition hover:bg-white"
                        >
                            Buy now
                        </a>
                    </div>
                </div>

                <div class="flex justify-center">
                    <a
                        href="https://instagram.com/ianjamiesonmusic"
                        class="inline-flex items-center justify-center text-white transition hover:text-white/80"
                        aria-label="Instagram: @ianjamiesonmusic"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-6 w-6"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1.1" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    </div>
    <!-- <header>ian jamieson music</header>

    <slot />

    <footer>inst</footer> -->
</template>