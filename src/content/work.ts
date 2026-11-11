import type { WorkItem } from '../types/work'

/**
 * Selected work for the home page, most recent first within each role.
 * Only what is in the CV, the productions or the videos — nothing invented.
 * Photos: when Denison sends a still of himself in one of these, put it in
 * public/media/ and set `image`; until then the card shows `mark`.
 */
export const WORK: WorkItem[] = [
  {
    key: 'nutcracker',
    role: 'dancer',
    house: 'Berlin Ballet Company, Berlin',
    year: '2026',
    mark: 'Nutcracker',
    production: 'nutcracker',
  },
  {
    key: 'cop17',
    role: 'dancer',
    house: 'COP17, Yerevan',
    year: '2026',
    image: '/media/productions/denison-silva-cop17-opening-show-yerevan-solo-lily.webp',
    mark: 'COP17',
    production: 'cop17',
  },
  {
    key: 'prometheus',
    role: 'dancer',
    house: 'Theater Hof',
    year: '2022–2025',
    mark: 'Prometheus',
  },
  {
    key: 'sodre',
    role: 'dancer',
    house: 'Ballet Nacional del Sodre, Montevideo',
    year: '2011–2012',
    mark: 'Sodre',
  },
  {
    key: 'midsummer',
    role: 'choreographer',
    house: 'Tanzoffensive Berlin',
    year: '2026',
    mark: 'Midsummer',
  },
  {
    key: 'spelunkenwirt',
    role: 'choreographer',
    house: 'NYC, Flensburg',
    year: '2025',
    image: '/media/videos/spelunkenwirt.jpg',
    mark: 'Spelunkenwirt',
    video: 'spelunkenwirt',
  },
  {
    key: 'ellis',
    role: 'choreographer',
    house: 'NYC, Flensburg',
    mark: 'Ellis',
  },
  {
    key: 'oxum',
    role: 'choreographer',
    house: 'Landestheater Detmold',
    mark: 'Oxum',
  },
]
