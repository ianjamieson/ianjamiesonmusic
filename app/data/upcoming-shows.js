// Upcoming shows for ianjamiesonmusic.co.uk.
//
// Snapshot of Notion "Music Leads" (Status = Booked, Type = Festival or Gig),
// taken 27 Nov 2026. This file is the source of truth. The site does not
// fetch Notion. See the README for how to refresh it.
//
// Rendered shows come from upcomingShows() only. A row is included when
// `published` is not false and its end date (or start, if it has no end) is
// still today or later in Europe/London at build time. Past shows drop off
// on the next generate.
//
// Rows that must stay off the site live in `unpublishedShows`
// (`published: false`, with a comment saying why). Do not import that list
// from a page.
//
// Never put agreed fees or Ian's role in this file. `notionName` is the
// original Music Leads title, kept so the next refresh can be reconciled.
// It is not shown on the site.

export const showsSnapshotTaken = '2026-11-27'

export const showsSnapshot = [
    {
        notionName: 'Portchester Castle',
        title: 'Portchester Castle',
        place: null,
        start: '2027-01-23',
        end: null,
    },
    {
        notionName: 'Icebreaker',
        title: 'Icebreaker',
        place: 'Southsea, Portsmouth',
        start: '2027-01-30',
        end: null,
    },
    {
        // "Olivia Fern at Portsmouth St Luke's" — artist, then venue.
        notionName: 'Olivia Fern at Portsmouth St Luke\'s',
        title: 'Olivia Fern',
        place: 'St Luke\'s, Portsmouth',
        start: '2027-03-06',
        end: null,
    },
    {
        notionName: 'James Dixon at Railway Inn',
        title: 'James Dixon',
        place: 'Railway Inn',
        start: '2027-03-07',
        end: null,
    },
    {
        notionName: 'Roo Panes at Portsmouth Cathedral',
        title: 'Roo Panes',
        place: 'Portsmouth Cathedral',
        start: '2027-03-10',
        end: null,
    },
    {
        notionName: 'Idsworth Church',
        title: 'Idsworth Church',
        place: null,
        start: '2027-04-04',
        end: null,
    },
    {
        // "Ayla Schafer at Portsmouth St George's Church" — artist, then venue.
        notionName: 'Ayla Schafer at Portsmouth St George\'s Church',
        title: 'Ayla Schafer',
        place: 'St George\'s Church, Portsmouth',
        start: '2027-04-10',
        end: null,
    },
    {
        // No venue on the lead. The workshop title is the whole public name.
        notionName: 'Ayla Schafer — Song of the Soul workshop',
        title: 'Ayla Schafer — Song of the Soul workshop',
        place: null,
        start: '2027-04-11',
        end: null,
    },
    {
        notionName: 'Olivia Fern at Glastonbury Assembly Rooms',
        title: 'Olivia Fern',
        place: 'Assembly Rooms, Glastonbury',
        start: '2027-05-08',
        end: null,
    },
    {
        // Notion date was 31 May 2026, which is stale. Ian gave 28 May to
        // 1 Jun 2027 at Gaunts House. Shown on that basis; still needs his confirmation.
        notionName: 'Freezone',
        title: 'Freezone',
        place: 'Gaunts House',
        start: '2027-05-28',
        end: '2027-06-01',
    },
    {
        notionName: 'Oh Shala Festival',
        title: 'Oh Shala Festival',
        place: 'Penn, High Wycombe',
        start: '2027-07-09',
        end: '2027-07-13',
    },
    {
        notionName: 'Rooted Heart Gathering',
        title: 'Rooted Heart Gathering',
        place: 'Field of Healing, Bythorn',
        start: '2027-07-23',
        end: '2027-07-25',
    },
]

// Kept in this file so a refresh does not add them back, and so the reason
// stays next to the snapshot. `published: false` — do not render these.
// No page imports this list. Leave it that way.
export const unpublishedShows = [
    // Do not publish: venue unclear (which Barley Mow / town).
    {
        notionName: 'Barley Mow Gig',
        title: 'Barley Mow',
        place: null,
        start: '2026-11-27',
        end: null,
        published: false,
    },
    // Do not publish: venue unclear.
    {
        notionName: 'Gemini Church Haslemere',
        title: 'Gemini Church Haslemere',
        place: null,
        start: '2026-12-04',
        end: null,
        published: false,
    },
    // Do not publish: venue unclear.
    {
        notionName: 'Casemates',
        title: 'Casemates',
        place: null,
        start: '2026-12-06',
        end: null,
        published: false,
    },
]

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

// Public list only: unpublished rows and shows that have already ended are removed.
// Only display fields are returned, so notes on a row cannot leak into the page.
export function upcomingShows(now = new Date()) {
    const today = londonToday(now)
    return showsSnapshot
        .filter((show) => show.published !== false && (show.end || show.start) >= today)
        .sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title))
        .map(({ title, place, start, end }) => ({
            title,
            place: place || null,
            start,
            end: end || null,
        }))
}
