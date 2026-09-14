/**
 * Structural CV data. Everything here is language-independent:
 * names, places, years, directors, production titles.
 * Prose that needs translating lives in src/i18n/*.json under
 * `cv.<id>.summary`, keyed by the `id` field below.
 */

export type Role = 'dancer' | 'teacher' | 'choreographer'

export interface Engagement {
  id: string
  org: string
  city: string
  country: string
  from: number
  /** omit for an ongoing engagement */
  to?: number
  roles: Role[]
  director?: string
  productions?: string[]
}

export const ROLES: Role[] = ['dancer', 'teacher', 'choreographer']

/** Most recent first — the order the page renders. */
export const ENGAGEMENTS: Engagement[] = [
  {
    id: 'tanzoffensive',
    org: 'Tanzoffensive Berlin',
    city: 'Berlin',
    country: 'Germany',
    from: 2026,
    roles: ['teacher', 'choreographer'],
    director: 'Doris Neff',
    productions: ['A Midsummer Night’s Dream'],
  },
  {
    id: 'tanzkompanie',
    org: 'Deutsche Tanzkompanie',
    city: 'Neustrelitz',
    country: 'Germany',
    from: 2026,
    to: 2026,
    roles: ['dancer'],
    director: 'Marco Zabel',
    productions: ['Die Csárdásfürstin'],
  },
  {
    id: 'jungestheaterhof',
    org: 'Junges Theater Hof',
    city: 'Hof',
    country: 'Germany',
    from: 2025,
    to: 2026,
    roles: ['teacher', 'choreographer'],
    productions: ['Grüne Träume, graue Zukunft'],
  },
  {
    id: 'nyc',
    org: 'NYC — North German Performing Arts Youth Company',
    city: 'Flensburg',
    country: 'Germany',
    from: 2023,
    to: 2026,
    roles: ['teacher', 'choreographer'],
    productions: [
      'Ellis in the Wonder World Water',
      'Spelunkerwirt',
      'Detmold Ballet Gala 2025',
    ],
  },
  {
    id: 'theaterhof',
    org: 'Theater Hof',
    city: 'Hof',
    country: 'Germany',
    from: 2022,
    to: 2025,
    roles: ['dancer'],
    director: 'Barbara Büse',
    productions: ['Die Geschöpfe des Prometheus', 'Ballet Blanc'],
  },
  {
    id: 'detmold',
    org: 'Landestheater Detmold',
    city: 'Detmold',
    country: 'Germany',
    from: 2020,
    to: 2022,
    roles: ['dancer', 'choreographer'],
    director: 'Katharina Torwesten',
    productions: ['Sacra', 'The Jungle Book', 'The Beauty of Oxum'],
  },
  {
    id: 'flensburg',
    org: 'Schleswig-Holsteinisches Landestheater',
    city: 'Flensburg',
    country: 'Germany',
    from: 2018,
    to: 2020,
    roles: ['dancer'],
    director: 'Katharina Torwesten',
    productions: ['Schwanensee', 'Heidi — Das Familienballett', 'The Nutcracker'],
  },
  {
    id: 'halberstadt',
    org: 'Nordharzer Städtebundtheater',
    city: 'Halberstadt',
    country: 'Germany',
    from: 2017,
    to: 2018,
    roles: ['dancer'],
    director: 'Can Arslan',
    productions: ['Hänsel und Gretel', 'Carmen'],
  },
  {
    id: 'france',
    org: 'Guess Company & Ballets de France',
    city: 'Toulouse',
    country: 'France',
    from: 2017,
    to: 2017,
    roles: ['dancer', 'teacher', 'choreographer'],
    productions: ['Ballets de France season tour'],
  },
  {
    id: 'brazil',
    org: 'Freelance work',
    city: 'São Paulo',
    country: 'Brazil',
    from: 2014,
    to: 2017,
    roles: ['dancer', 'teacher', 'choreographer'],
  },
  {
    id: 'argentina',
    org: 'Ballet Nacional de Argentina',
    city: 'Buenos Aires',
    country: 'Argentina',
    from: 2013,
    to: 2014,
    roles: ['dancer'],
    director: 'Iñaki Urlezaga',
  },
  {
    id: 'sodre',
    org: 'Ballet Nacional del Sodre',
    city: 'Montevideo',
    country: 'Uruguay',
    from: 2011,
    to: 2012,
    roles: ['dancer'],
    director: 'Julio Bocca',
  },
]

export interface Education {
  id: string
  school: string
  city: string
  country: string
  from: number
  to: number
  director: string
}

export const EDUCATION: Education[] = [
  {
    id: 'pacific',
    school: 'Pacific Dance Arts',
    city: 'Vancouver',
    country: 'Canada',
    from: 2009,
    to: 2010,
    director: 'Li Yaming',
  },
  {
    id: 'pavarini',
    school: 'Centro de Artes Pavarini',
    city: 'São Paulo',
    country: 'Brazil',
    from: 2006,
    to: 2009,
    director: 'Daniella Pavarini & Gisele Pavarini',
  },
]

/** Choreographers whose work he has danced — the spine of the dancer CV. */
export const REPERTOIRE = [
  'George Balanchine',
  'Nacho Duato',
  'Frederick Ashton',
  'Natalia Makarova',
  'Mauricio Wainrot',
  'Vicente Nebrada',
  'Anna-Marie Holmes',
  'Silvia Bazilis',
  'Ronald Hynd',
]

export const CONTACT = {
  email: 'contact@denisonsilva.com',
  phone: '+49 172 319 4331',
  phoneHref: '+491723194331',
  city: '10785 Berlin',
  site: 'www.denisonsilva.com',
  languages: ['Portuguese', 'English', 'German', 'Spanish'],
} as const
