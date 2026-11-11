import { LANGUAGES, ORIGIN } from '../content/routes'

/** The id that every page's structured data uses to point at Denison. */
export const PERSON_ID = `${ORIGIN}/#person`

/** Who the whole site is about — on every page, so each one links back to him. */
export const SITE: object[] = [
  {
    '@type': 'WebSite',
    '@id': `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: 'Denison Silva',
    inLanguage: [...LANGUAGES],
    about: { '@id': PERSON_ID },
  },
  {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Denison Silva',
    alternateName: 'Denison Pereira da Silva',
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/media/portrait.jpg`,
    description:
      'Ballet dancer, ballet and jazz teacher and choreographer in Berlin, with fifteen years on stage in Uruguay, Argentina, Brazil, France and Germany.',
    jobTitle: ['Ballet dancer', 'Ballet and jazz teacher', 'Choreographer'],
    knowsAbout: [
      'Classical ballet',
      'Neoclassical ballet',
      'Jazz dance',
      'Lyrical jazz',
      'Contemporary dance',
      'Choreography',
    ],
    knowsLanguage: ['pt', 'en', 'de', 'es'],
    email: 'mailto:contact@denisonsilva.com',
    address: {
      '@type': 'PostalAddress',
      postalCode: '10785',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Tanzoffensive Berlin',
      url: 'https://www.tanzoffensive.com/tanzoffensive-berlin',
    },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Centro de Artes Pavarini' },
      { '@type': 'EducationalOrganization', name: 'Pacific Dance Arts' },
    ],
    sameAs: [
      'https://www.instagram.com/denison.pereiradasilva/',
      'https://www.theapolis.de/de/profil/denison-silva',
      'https://www.youtube.com/@denison817',
    ],
  },
]
