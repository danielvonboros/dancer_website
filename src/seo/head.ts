import type { TFunction } from 'i18next'
import { pageMeta } from './meta'
import { VIDEOS, type VideoItem } from '../data/media'
import { instagramUrl, type Production } from '../data/productions'
import type { TKey } from '../i18n'
import {
  alternates,
  isIndexable,
  LANGUAGES,
  ORIGIN,
  pagePath,
  productionPath,
  routePath,
  videoPath,
  type Language,
  type Route,
} from '../routes'

/**
 * Everything in <head> that differs per page, written by the prerender
 * as plain HTML: crawlers and link previews that never run JavaScript
 * still get the right title, language versions and structured data.
 */
export function buildHead(route: Route, t: TFunction): string {
  const meta = pageMeta(route, t)
  const indexable = isIndexable(route)
  const url = ORIGIN + routePath(route)
  const video =
    route.page === 'video'
      ? route.video
      : route.page === 'production'
        ? VIDEOS.find((v) => v.key === route.production.video)
        : undefined
  const image = video
    ? { src: ORIGIN + video.thumb, width: 1280, height: 720, alt: meta.title }
    : {
        src: `${ORIGIN}/media/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Denison Silva — the name set in large type over his portrait',
      }

  const tags: (string | false | undefined)[] = [
    `<title>${esc(meta.title)}</title>`,
    meta.description && `<meta name="description" content="${esc(meta.description)}" />`,
    !indexable && '<meta name="robots" content="noindex" />',
    indexable && `<link rel="canonical" href="${url}" />`,
    ...(indexable ? hreflang(route) : []),
    '<link rel="icon" href="/favicon.ico" sizes="48x48" />',
    '<link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    `<meta property="og:type" content="${route.page === 'home' ? 'profile' : route.page === 'video' ? 'video.other' : 'website'}" />`,
    '<meta property="og:site_name" content="Denison Silva" />',
    `<meta property="og:locale" content="${OG_LOCALE[route.lang]}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    meta.description && `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${image.src}" />`,
    `<meta property="og:image:width" content="${image.width}" />`,
    `<meta property="og:image:height" content="${image.height}" />`,
    `<meta property="og:image:alt" content="${esc(image.alt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    jsonLd(structuredData(route, url, t)),
  ]
  return tags.filter(Boolean).join('\n    ')
}

const OG_LOCALE: Record<Language, string> = { en: 'en_US', de: 'de_DE', pt: 'pt_BR' }

/** Each page names all three language versions; English is the default. */
function hreflang(route: Route): string[] {
  const paths = alternates(route)
  return [
    ...LANGUAGES.map((lang) => `<link rel="alternate" hreflang="${lang}" href="${ORIGIN}${paths[lang]}" />`),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${paths.en}" />`,
  ]
}

const PERSON_ID = `${ORIGIN}/#person`

/** Who the whole site is about — on every page, so each one links back to him. */
const SITE: object[] = [
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

function structuredData(route: Route, url: string, t: TFunction): object[] {
  if (!isIndexable(route) || route.page === 'home') return SITE

  const crumbs = [{ name: t('pages.home'), path: pagePath('home', route.lang) }]
  if (route.page === 'video') {
    crumbs.push({ name: t('nav.videos'), path: pagePath('videos', route.lang) })
    crumbs.push({ name: t(`videos.items.${route.video.key}.title` as TKey), path: videoPath(route.video, route.lang) })
  } else if (route.page === 'production') {
    crumbs.push({
      name: t(`productions.items.${route.production.key}.title` as TKey),
      path: productionPath(route.production, route.lang),
    })
  } else if (route.page !== 'notFound') {
    crumbs.push({ name: t(`pages.labels.${route.page}` as TKey), path: pagePath(route.page, route.lang) })
  }

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: ORIGIN + crumb.path,
    })),
  }

  if (route.page === 'video') return [...SITE, breadcrumbs, videoObject(route.video, url, t)]
  if (route.page === 'production') return [...SITE, breadcrumbs, eventObject(route.production, url, t)]
  return [...SITE, breadcrumbs]
}

/** The show as an event he performed in — date, place, company. */
function eventObject(production: Production, url: string, t: TFunction): object {
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

/** What Google needs to list a video: the player loads only on click, so this is how it finds it. */
function videoObject(video: VideoItem, url: string, t: TFunction): object {
  const minutes = Math.floor(video.duration / 60)
  const seconds = video.duration % 60
  return {
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    url,
    name: t(`videos.items.${video.key}.title` as TKey),
    description: t(`videos.items.${video.key}.description` as TKey),
    thumbnailUrl: [ORIGIN + video.thumb],
    uploadDate: video.uploadDate,
    duration: `PT${minutes}M${seconds}S`,
    embedUrl:
      video.provider === 'youtube'
        ? `https://www.youtube-nocookie.com/embed/${video.id}`
        : `https://player.vimeo.com/video/${video.id}`,
    creator: { '@id': PERSON_ID },
  }
}

function jsonLd(graph: object[]): string {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
