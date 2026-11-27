// Single place for everything site-wide.
export const SITE = {
    url: 'https://ianjamiesonmusic.co.uk',
    name: 'Ian Jamieson',
    description: 'Acoustic guitarist and songwriter based in Portsmouth. Listen to the music, or book a one to one guitar and songwriting lesson.',
    ogImage: '/og.jpg',

    // The address is decided, but the mailbox still needs creating in Cloudflare
    // Email Routing - the MX records are already in place.
    email: 'bookings@ianjamiesonmusic.co.uk',

    spotifyArtistId: '2q2E2GheKlqjEBXPUEAcNR',
    instagram: 'https://instagram.com/ianjamiesonmusic',
    vinylUrl: 'https://elasticstage.com/ian-jamieson/releases/ep-singleep',

    calLink: 'ianjamieson/1-1-guitar-lesson',
    calNamespace: '1-1-guitar-lesson',

    // Mailing list is disabled - the only thing that read this was the form in
    // SiteFooter.vue, which is commented out. Uncomment both to bring it back.
    // emailOctopusListId: 'YOUR-LIST-ID',

    // Not needed if you enable Web Analytics from the Cloudflare Pages dashboard,
    // which injects the beacon for you. Uncomment this AND the block in app/app.vue
    // only if you want to inject the script manually instead.
    // cloudflareAnalyticsToken: '',

    lesson: {
        duration: '80 minutes',
        price: '£55',
        location: 'Portsmouth',
    },
}

export const spotifyArtistUrl = `https://open.spotify.com/artist/${SITE.spotifyArtistId}`
