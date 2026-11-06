import { VIDEOS, type VideoItem } from './data/media'

export const LANGUAGES = ['en', 'de', 'pt'] as const
export type Language = (typeof LANGUAGES)[number]

export const ORIGIN = 'https://www.denisonsilva.com'

/**
 * English stays at the root because Google already knows the site there;
 * German and Portuguese get a prefix. Every page has its own translated
 * slug, so each language can rank for what people search in it.
 */
const PREFIX: Record<Language, string> = { en: '', de: '/de', pt: '/pt' }

export type PageId =
  | 'home'
  | 'videos'
  | 'ballet'
  | 'contemporary'
  | 'jazz'
  | 'private'
  | 'workshops'
  | 'choreography'
  | 'dancer'
  | 'imprint'
  | 'privacy'

interface PageDef {
  slug: Record<Language, string>
  /**
   * Visible in `yarn dev` only. Remove the flag once the page's text in
   * src/content/pages.ts is written — the build then renders the page,
   * lists it in the sitemap and links it from the footer.
   */
  draft?: boolean
  /** reachable, but kept out of search results and the sitemap */
  noindex?: boolean
}

export const PAGES: Record<PageId, PageDef> = {
  home: { slug: { en: '', de: '', pt: '' } },
  videos: { slug: { en: 'videos', de: 'videos', pt: 'videos' } },
  ballet: {
    slug: { en: 'ballet-classes-berlin', de: 'ballettunterricht-berlin', pt: 'aulas-de-bale-berlim' },
    draft: true,
  },
  contemporary: {
    slug: {
      en: 'contemporary-dance-classes-berlin',
      de: 'contemporary-dance-berlin',
      pt: 'aulas-de-danca-contemporanea-berlim',
    },
    draft: true,
  },
  jazz: {
    slug: { en: 'jazz-dance-classes-berlin', de: 'jazz-dance-berlin', pt: 'aulas-de-jazz-berlim' },
    draft: true,
  },
  private: {
    slug: {
      en: 'private-ballet-lessons-berlin',
      de: 'ballett-privatstunden-berlin',
      pt: 'aulas-particulares-de-bale-berlim',
    },
    draft: true,
  },
  workshops: {
    slug: {
      en: 'dance-workshops-for-schools',
      de: 'tanzworkshops-schulen-kitas',
      pt: 'oficinas-de-danca-para-escolas',
    },
    draft: true,
  },
  choreography: {
    slug: { en: 'choreography', de: 'choreografie', pt: 'coreografia' },
    draft: true,
  },
  dancer: { slug: { en: 'dancer', de: 'taenzer', pt: 'bailarino' }, draft: true },
  imprint: { slug: { en: 'imprint', de: 'impressum', pt: 'impressum' }, noindex: true },
  privacy: { slug: { en: 'privacy', de: 'datenschutz', pt: 'privacidade' }, noindex: true },
}

export type Route =
  | { page: PageId; lang: Language }
  | { page: 'video'; lang: Language; video: VideoItem }
  | { page: 'notFound'; lang: Language }

/** Every path ends in a slash: each page is a folder with an index.html. */
export function pagePath(page: PageId, lang: Language): string {
  const slug = PAGES[page].slug[lang]
  return `${PREFIX[lang]}/${slug ? `${slug}/` : ''}`
}

export function videoPath(video: VideoItem, lang: Language): string {
  return `${pagePath('videos', lang)}${video.slug[lang]}/`
}

export function routePath(route: Route): string {
  if (route.page === 'video') return videoPath(route.video, route.lang)
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
  if (route.page === 'video') return true
  return !PAGES[route.page].noindex
}

/** Every page this build renders, in every language. */
export function allRoutes(): Route[] {
  const pages = (Object.keys(PAGES) as PageId[]).filter(isLive)
  return LANGUAGES.flatMap((lang): Route[] => [
    ...pages.map((page) => ({ page, lang })),
    ...VIDEOS.map((video) => ({ page: 'video' as const, lang, video })),
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
  return JSON.stringify({ page: route.page, lang: route.lang, video })
}

export function parseRoute(json: string): Route | null {
  try {
    const { page, lang, video } = JSON.parse(json) as { page: string; lang: Language; video?: string }
    if (page === 'video') {
      const item = VIDEOS.find((v) => v.key === video)
      return item ? { page, lang, video: item } : null
    }
    if (page === 'notFound') return { page, lang }
    return page in PAGES ? { page: page as PageId, lang } : null
  } catch {
    return null
  }
}
