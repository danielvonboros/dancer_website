import type { Language } from './route'

/**
 * Productions with a page of their own at /productions/<slug>/: what the
 * show is, when and where, and everyone who made it. Title, summary and
 * meta description per language live in src/i18n/*.json under
 * `productions.items.<key>`; the credits below stay as the production
 * published them, in English, in every language.
 *
 * The CV entry for a production points here with `production: '<key>'`
 * in src/data/cv.ts — that is where the CV links to the page from.
 */
export interface Person {
  /** a real name, or an @handle when that is all the production credits */
  name: string
  /** Instagram handle without the @ */
  instagram?: string
  /** Denison himself — his row is set apart in the list */
  self?: boolean
}

export interface Credit {
  people: Person[]
  /** what they did for the show, as credited */
  role: string
}

export interface Photo {
  /** names the alt text in src/i18n/*.json: productions.items.<key>.photos.<photo key> */
  key: string
  /** file in /public/media/productions — WebP, the name says what is in it */
  src: string
}

export interface Production {
  key: string
  /** last path segment of the production's page, per language */
  slug: Record<Language, string>
  /** the company or event that made the show */
  presenter: { name: string; url?: string; instagram?: string }
  city: string
  /** ISO 3166 code, for structured data */
  countryCode: string
  venue?: { name: string; street: string; postalCode: string }
  /** first and last performance, YYYY-MM-DD */
  start: string
  end?: string
  /** marked "current" up to and including this day, YYYY-MM-DD */
  currentUntil?: string
  /** key in VIDEOS (src/data/media.ts) */
  video?: string
  /** the production's own page */
  website?: string
  /** schema.org event type for Google */
  eventType: 'DanceEvent' | 'Event'
  credits: Credit[]
  /** a closing line under the credits, e.g. the score */
  music?: string
  /** shown as a row of thumbnails above the video; click opens it full width */
  photos?: Photo[]
}
