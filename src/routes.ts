import { VIDEOS } from './content/videos'
import { PRODUCTIONS } from './content/productions'
import { LANGUAGES, PAGES, PREFIX, PRODUCTIONS_DIR } from './content/routes'
import type { Language, PageId, Route } from './types/route'
import type { Production } from './types/production'
import type { VideoItem } from './types/video'

/*
 * Paths of every page in every language, and the way back from a path to
 * its page. The list of pages and their slugs is in src/content/routes.ts.
 */
/** Every path ends in a slash: each page is a folder with an index.html. */
export function pagePath(page: PageId, lang: Language): string {
  const slug = PAGES[page].slug[lang]
  return `${PREFIX[lang]}/${slug ? `${slug}/` : ''}`
}

export function videoPath(video: VideoItem, lang: Language): string {
  return `${pagePath('videos', lang)}${video.slug[lang]}/`
}

export function productionPath(production: Production, lang: Language): string {
  return `${PREFIX[lang]}/${PRODUCTIONS_DIR[lang]}/${production.slug[lang]}/`
}

export function routePath(route: Route): string {
  if (route.page === 'video') return videoPath(route.video, route.lang)
  if (route.page === 'production') return productionPath(route.production, route.lang)
  if (route.page === 'notFound') return '/404.html'
  return pagePath(route.page, route.lang)
}

/** The same page in every language — what the switcher and hreflang point at. */
export function alternates(route: Route): Record<Language, string> {
  const of = (lang: Language): string => {
    if (route.page === 'notFound') return pagePath('home', lang)
    return routePath({ ...route, lang })
  }
  return { en: of('en'), de: of('de'), pt: of('pt') }
}

export function isLive(page: PageId): boolean {
  return !PAGES[page].draft || import.meta.env.DEV
}

export function isIndexable(route: Route): boolean {
  if (route.page === 'notFound') return false
  if (route.page === 'video' || route.page === 'production') return true
  return !PAGES[route.page].noindex
}

/** Every page this build renders, in every language. */
export function allRoutes(): Route[] {
  const pages = (Object.keys(PAGES) as PageId[]).filter(isLive)
  return LANGUAGES.flatMap((lang): Route[] => [
    ...pages.map((page) => ({ page, lang })),
    ...VIDEOS.map((video) => ({ page: 'video' as const, lang, video })),
    ...PRODUCTIONS.map((production) => ({ page: 'production' as const, lang, production })),
  ])
}

let byPath: Map<string, Route> | undefined

/** Finds the route for a URL path; unknown paths get the 404 page. */
export function resolve(pathname: string): Route {
  byPath ??= new Map(allRoutes().map((route) => [routePath(route), route]))
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const lang = LANGUAGES.find((l) => l !== 'en' && path.startsWith(`${PREFIX[l]}/`)) ?? 'en'
  return byPath.get(path) ?? { page: 'notFound', lang }
}

/** What the prerender hands to the browser, so it hydrates the same route. */
export function serializeRoute(route: Route): string {
  const video = route.page === 'video' ? route.video.key : undefined
  const production = route.page === 'production' ? route.production.key : undefined
  return JSON.stringify({ page: route.page, lang: route.lang, video, production })
}

export function parseRoute(json: string): Route | null {
  try {
    const { page, lang, video, production } = JSON.parse(json) as {
      page: string
      lang: Language
      video?: string
      production?: string
    }
    if (page === 'video') {
      const item = VIDEOS.find((v) => v.key === video)
      return item ? { page, lang, video: item } : null
    }
    if (page === 'production') {
      const item = PRODUCTIONS.find((p) => p.key === production)
      return item ? { page, lang, production: item } : null
    }
    if (page === 'notFound') return { page, lang }
    return page in PAGES ? { page: page as PageId, lang } : null
  } catch {
    return null
  }
}
