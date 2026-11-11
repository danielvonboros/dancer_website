import type { TFunction } from 'i18next'
import { pageMeta } from './meta'
import { jsonLd } from './jsonLd'
import { structuredData } from './structuredData'
import { VIDEOS } from '../content/videos'
import { escapeHtml } from '../utils/escapeHtml'
import { alternates, isIndexable, routePath } from '../routes'
import { LANGUAGES, ORIGIN } from '../content/routes'
import { type Language, type Route } from '../types/route'

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
    `<title>${escapeHtml(meta.title)}</title>`,
    meta.description && `<meta name="description" content="${escapeHtml(meta.description)}" />`,
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
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    meta.description && `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${image.src}" />`,
    `<meta property="og:image:width" content="${image.width}" />`,
    `<meta property="og:image:height" content="${image.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(image.alt)}" />`,
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
