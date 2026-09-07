<script setup>
// Mailing list temporarily disabled - SITE.emailOctopusListId is still a placeholder,
// so the form posts nowhere. Uncomment this block and the markup below to restore.
// const listId = SITE.emailOctopusListId
// const formAction = `https://emailoctopus.com/lists/${listId}/members/embedded/1.3/add`
// const honeypotName = `hp${listId}`
</script>

<template>
    <footer class="mt-16 border-t border-white/10 px-6 py-8 sm:px-12">
        <div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
            <!-- Mailing list signup - disabled until the EmailOctopus list ID is set.
            <div class="w-full max-w-sm text-center">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Occasional emails
                </p>
                <p class="mt-2 text-sm text-white/60">
                    New songs, new dates. Nothing else.
                </p>

                <form :action="formAction" method="post" target="_blank" class="mt-4 flex gap-2">
                    <label for="eo-email" class="sr-only">Email address</label>
                    <input
                        id="eo-email"
                        type="email"
                        name="field_0"
                        required
                        placeholder="you@example.com"
                        class="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                    >
                    <div class="absolute left-[-5000px]" aria-hidden="true">
                        <input type="text" :name="honeypotName" tabindex="-1" autocomplete="off">
                    </div>
                    <button
                        type="submit"
                        class="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                    >
                        Join
                    </button>
                </form>
            </div>
            -->

            <div class="flex items-center gap-6">
                <a
                    :href="SITE.instagram"
                    class="p-2 text-white/60 transition hover:text-white"
                    aria-label="Instagram"
                >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1.1" />
                    </svg>
                </a>
                <a
                    :href="spotifyArtistUrl"
                    class="p-2 text-white/60 transition hover:text-white"
                    aria-label="Spotify"
                >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.601.301.96zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>
