// Upcoming events from the public Bandsintown API.
// Fetched when the site is generated. The app id is the public id their API
// requires. It is not a secret. If the request fails, the caller keeps the
// snapshot list and the build still succeeds.

import { SITE } from '../utils/site.js'

const ARTIST = 'ian jamieson'

function clean(value) {
    return typeof value === 'string' ? value.trim() : ''
}

function dateOnly(value) {
    const day = clean(value).slice(0, 10)
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null
}

function cityAlreadyIn(venue, city) {
    return city && venue.toLowerCase().includes(city.toLowerCase())
}

function placeFor(venue, city) {
    if (!city || cityAlreadyIn(venue, city)) return null
    return city
}

// A bill such as "Nessi Gomes at Portsmouth Cathedral" keeps the other artist
// as the title and the venue as the place. A longer bill, or a show that is
// only Ian, is named for the venue. Ian's role is never included.
function titleAndPlace(event) {
    const city = clean(event.venue?.city)
    let venueName = clean(event.venue?.name)
    const eventTitle = clean(event.title)
    if (eventTitle && venueName === eventTitle) venueName = ''

    const source = eventTitle || venueName
    const at = source.match(/^(.*?)\s+at\s+(.+)$/i)
    if (at) {
        const names = at[1].split(/,|\band\b/i).map(name => name.trim()).filter(Boolean)
        const others = names.filter(name => name.toLowerCase() !== ARTIST)
        const venue = at[2].trim()
        if (others.length === 1 && names.length <= 2) {
            return { title: others[0], place: venue }
        }
        return { title: venue, place: placeFor(venue, city) }
    }

    const title = venueName || eventTitle
    if (!title) return null
    return { title, place: placeFor(title, city) }
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
