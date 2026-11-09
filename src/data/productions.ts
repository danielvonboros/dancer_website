import type { Language } from '../routes'

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

const ig = (handle: string): Person => ({ name: `@${handle}`, instagram: handle })

const SELF: Person = { name: 'Denison Silva', instagram: 'denison.pereiradasilva', self: true }

const names = (...list: string[]): Person[] => list.map((name) => ({ name }))

export const PRODUCTIONS: Production[] = [
  {
    key: 'nutcracker',
    slug: {
      en: 'nutcracker-berlin-ballet-company-2026',
      de: 'nussknacker-berlin-ballet-company-2026',
      pt: 'quebra-nozes-berlin-ballet-company-2026',
    },
    presenter: { name: 'Berlin Ballet Company', url: 'https://www.berlinballet.company/' },
    city: 'Berlin',
    countryCode: 'DE',
    venue: { name: 'Kino Babylon', street: 'Rosa-Luxemburg-Straße 30', postalCode: '10178' },
    start: '2026-12-18',
    end: '2026-12-20',
    currentUntil: '2026-12-20',
    video: 'nutcracker_trailer',
    website: 'https://www.berlinballet.company/nutcracker',
    eventType: 'DanceEvent',
    credits: [
      { people: [SELF], role: 'Dancer — Mice, The Woodcutter' },
      {
        people: names(
          'Lisa Pavlov',
          'Lucio Vidal',
          'Mami Fujii',
          'Rodrigo Bonaventura',
          'Aljosha Puchinsky',
          'Mihael Belilov',
          'Katherina Nikelski',
          'Camryn Jefferson',
          'Olaf Kollmannsperger',
          'Anna Freedman',
        ),
        role: 'Dancers',
      },
      {
        people: [{ name: 'Alexander Abdukarimov' }],
        role: 'Choreographer, Artistic Director, Film Director',
      },
      { people: [{ name: 'Nicole Kohlmann', instagram: 'nicolekohlmann72' }], role: 'Dramaturgy' },
      {
        people: [{ name: 'Arshak Ghalumyan', instagram: 'arshakghalumyan.choregrapher' }],
        role: 'Choreographer',
      },
      { people: [{ name: 'Mike IV', instagram: 'iv.mike' }], role: 'Visual Designer' },
      {
        people: [{ name: 'Natalia Chernova', instagram: 'tchernat' }],
        role: 'Costume & Set Designer',
      },
      { people: [{ name: 'Baina Uchaeva', instagram: 'baina.uchaeva' }], role: 'Hair & Make Up' },
      { people: [{ name: 'Narek Tumanyan' }], role: 'Lighting Designer' },
      { people: [{ name: 'Oleksandr Shpak' }], role: 'Producer' },
      { people: [{ name: 'Hauke Kaphengst' }], role: 'Technical Director' },
    ],
    music: 'Pyotr Tchaikovsky, “The Nutcracker”',
  },
  {
    key: 'cop17',
    slug: {
      en: 'cop17-opening-show-yerevan-2026',
      de: 'cop17-eroeffnungsshow-jerewan-2026',
      pt: 'cop17-show-de-abertura-erevan-2026',
    },
    presenter: {
      name: '17th Conference of the Parties to the UN Convention on Biological Diversity',
      instagram: 'cop17armenia',
    },
    city: 'Yerevan',
    countryCode: 'AM',
    start: '2026-10-18',
    video: 'cop17_opening',
    eventType: 'Event',
    photos: [
      {
        key: 'armsOutstretched',
        src: '/media/productions/denison-silva-cop17-opening-show-yerevan-arms-outstretched-v-formation.webp',
      },
      {
        key: 'splitLeap',
        src: '/media/productions/denison-silva-cop17-opening-show-yerevan-split-leap.webp',
      },
      {
        key: 'ensemblePyramid',
        src: '/media/productions/denison-silva-cop17-opening-show-yerevan-ensemble-pyramid.webp',
      },
      {
        key: 'soloLily',
        src: '/media/productions/denison-silva-cop17-opening-show-yerevan-solo-lily.webp',
      },
    ],
    credits: [
      { people: [SELF], role: 'Dancer & Soloist, Rehearsal Coordination Studio' },
      {
        people: names(
          'Nina Hayrapetyan',
          'Cardin Chung',
          'Daniella Silverman',
          'Coco Vianne Daro',
          'Jaide Angelita Almeida',
          'Miguel Angel Collado Sanchez',
          'Veronica Sala',
          'Clémentine Boullé',
          'Volodya Hakhumyan',
          'Ada Campagnolo',
          'Alex Vazquez Gala',
          'Corina Kinnear',
          'Deborah Dalla Valle',
          'Garance Stähli',
          'Ian Edwards',
          'Mykhailo Tretiak',
          'Miriam Díaz Gordo',
          'Robert Hyland',
          'Sahatsa Ramirez Saralegui',
        ),
        role: 'Dancers',
      },
      { people: [ig('evgeniya_bespalaya')], role: 'Show Director' },
      { people: [ig('we_show_team')], role: 'Show Production' },
      { people: [ig('jivoy_dance')], role: 'Choreographer' },
      { people: [ig('dopingspace')], role: 'Organisation' },
      { people: [ig('savateev_aleksei')], role: 'Technical Director' },
      { people: [ig('perukua')], role: 'Soloist' },
      { people: [ig('alenaakhmadullina')], role: 'Costume Designer & Soloist’s Dress' },
      { people: [ig('gurvichnastya')], role: 'Ballet Costume Design & Production' },
      { people: [ig('skrasin')], role: 'Music Producer' },
      {
        people: [ig('musicalization.ru'), ig('vokaylop_levap'), ig('valeritolstov')],
        role: 'Composers',
      },
      { people: [ig('niknib')], role: 'Lighting Designer' },
      { people: [ig('talgat_batalov')], role: 'Second Director' },
      { people: [ig('t.nitchenko'), ig('ekaterina_sazhina_muah')], role: 'Makeup Artists' },
      { people: [ig('vindrievsky'), ig('vereschagin_wedding')], role: 'Photographers' },
    ],
  },
]

export function findProduction(key: string): Production | undefined {
  return PRODUCTIONS.find((p) => p.key === key)
}

export function instagramUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`
}

/** Today in the visitor's time zone, YYYY-MM-DD — comparable as a string. */
export function localDay(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
