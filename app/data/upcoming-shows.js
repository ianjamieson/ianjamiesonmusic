// Upcoming Shows for ianjamiesonmusic.co.uk.
//
// The list is filled only from the Bandsintown API, at build time. Dates that
// are not on Bandsintown are not shown. A show drops off once its end date is
// before today in the UK.

import { fetchBandsintownShows } from './bandsintown.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parts(iso) {
    const [y, m, d] = iso.split('-').map(Number)
    const date = new Date(Date.UTC(y, m - 1, d))
    return { y, m, d, wd: WEEKDAYS[date.getUTCDay()], mon: MONTHS[m - 1] }
}

// UK style, matching "Sat 23 Jan 2027". Ranges keep a weekday on both ends.
export function formatShowDate(show) {
    const start = parts(show.start)
    const single = `${start.wd} ${start.d} ${start.mon} ${start.y}`
    if (!show.end || show.end === show.start) return single

    const end = parts(show.end)
    const left = `${start.wd} ${start.d} ${start.mon}`
    const right = `${end.wd} ${end.d} ${end.mon}`
    if (start.y === end.y) return `${left} – ${right} ${end.y}`
    return `${left} ${start.y} – ${right} ${end.y}`
}

// ISO 8601 date, or a start/end interval when the show runs over more than one day.
export function showDateTime(show) {
    if (!show.end || show.end === show.start) return show.start
    return `${show.start}/${show.end}`
}

export function londonToday(now = new Date()) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(now)
}

// Only Bandsintown events whose end date is today or later. Display fields only.
export async function upcomingShows(now = new Date()) {
    const today = londonToday(now)
    let shows = []
    try {
        shows = await fetchBandsintownShows()
    } catch (error) {
        console.warn(`[shows] Bandsintown request failed: ${error?.message || error}`)
    }

    return shows
        .filter(show => (show.end || show.start) >= today)
        .sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title))
        .map(({ title, place, start, end, tickets }) => ({
            title,
            place: place || null,
            start,
            end: end || null,
            tickets: tickets || null,
        }))
}
