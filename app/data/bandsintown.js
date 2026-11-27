// Upcoming events from the public Bandsintown API. This is the only source
// for the Upcoming Shows page. The app id is the public id their API requires.
// It is not a secret.

import { SITE } from '../utils/site.js'

const ARTIST = 'ian jamieson'

function clean(value) {
    return typeof value === 'string' ? value.trim() : ''
}

function dateOnly(value) {
    const day = clean(value).slice(0, 10)
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null
}

function tidy(venue) {
    return venue.replace(/\s+ltd\.?$/i, '').trim()
}

function withCity(venue, city) {
    if (!venue) return city || null
    if (!city || venue.toLowerCase().includes(city.toLowerCase())) return venue
    return `${venue}, ${city}`
}

// Taken only from the Bandsintown event. When one other artist is on the bill,
// that name is the title and the venue is the place. A longer bill, or a show
// that is only Ian, is named for the venue. Ian's role is never included.
function titleAndPlace(event) {
    const city = clean(event.venue?.city)
    let venueName = clean(event.venue?.name)
    const eventTitle = clean(event.title)
    if (eventTitle && venueName === eventTitle) venueName = ''

    let venue = venueName
    if (!venue && eventTitle) {
        const at = eventTitle.match(/\sat\s+(.+)$/i)
        venue = at ? at[1].trim() : ''
    }
    venue = venue ? tidy(venue) : ''

    const others = (event.lineup || [])
        .map(clean)
        .filter(name => name && name.toLowerCase() !== ARTIST)
    const titledBill = Boolean(eventTitle && /\sat\s+/i.test(eventTitle))

    if (others.length === 1 && !titledBill) {
        return { title: others[0], place: withCity(venue, city) }
    }

    const title = venue || tidy(eventTitle)
    if (!title) return null
    const place = city && !title.toLowerCase().includes(city.toLowerCase()) ? city : null
    return { title, place }
}

function ticketUrl(event) {
    if (event.sold_out) return null
    const offer = (event.offers || []).find(item =>
        item
        && item.type === 'Tickets'
        && item.status === 'available'
        && typeof item.url === 'string',
    )
    if (!offer) return null
    try {
        const url = new URL(offer.url)
        if (url.protocol !== 'https:' || url.hostname !== 'www.bandsintown.com') return null
        return url.toString()
    } catch {
        return null
    }
}

export function bandsintownShow(event) {
    const start = dateOnly(event.festival_start_date) || dateOnly(event.datetime)
    if (!start) return null
    const named = titleAndPlace(event)
    if (!named) return null

    let end = dateOnly(event.festival_end_date) || dateOnly(event.ends_at)
    if (!end || end <= start) end = null

    return {
        title: named.title,
        place: named.place,
        start,
        end,
        tickets: ticketUrl(event),
    }
}

export async function fetchBandsintownShows() {
    const url = new URL(`https://rest.bandsintown.com/artists/id_${SITE.bandsintownArtistId}/events`)
    url.searchParams.set('app_id', SITE.bandsintownAppId)
    url.searchParams.set('date', 'upcoming')

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; ianjamiesonmusic/1.0; +https://ianjamiesonmusic.co.uk)',
        },
        signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error(`Bandsintown responded ${response.status}`)

    const data = await response.json()
    if (!Array.isArray(data)) return []
    return data.map(bandsintownShow).filter(Boolean)
}
