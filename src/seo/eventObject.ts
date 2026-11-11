import type { TFunction } from 'i18next'
import { PERSON_ID } from './siteGraph'
import { VIDEOS } from '../content/videos'
import { ORIGIN } from '../content/routes'
import { instagramUrl } from '../utils/instagramUrl'
import type { TKey } from '../i18n'
import type { Production } from '../types/production'

/** The show as an event he performed in — date, place, company. */
export function eventObject(production: Production, url: string, t: TFunction): object {
  const { presenter, venue } = production
  const video = VIDEOS.find((v) => v.key === production.video)
  return {
    '@type': production.eventType,
    '@id': `${url}#event`,
    url,
    name: t(`productions.items.${production.key}.title` as TKey),
    description: t(`productions.items.${production.key}.description` as TKey),
    startDate: production.start,
    endDate: production.end ?? production.start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: venue?.name ?? production.city,
      address: {
        '@type': 'PostalAddress',
        streetAddress: venue?.street,
        postalCode: venue?.postalCode,
        addressLocality: production.city,
        addressCountry: production.countryCode,
      },
    },
    image: [
      ...(production.photos ?? []).map((photo) => ORIGIN + photo.src),
      ...(video ? [ORIGIN + video.thumb] : []),
    ],
    organizer: {
      '@type': 'Organization',
      name: presenter.name,
      url: presenter.url,
      sameAs: presenter.instagram ? [instagramUrl(presenter.instagram)] : undefined,
    },
    performer: { '@id': PERSON_ID },
    sameAs: production.website ? [production.website] : undefined,
  }
}
