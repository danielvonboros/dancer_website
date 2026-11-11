import type { LANGUAGES } from '../content/routes'
import type { Production } from './production'
import type { VideoItem } from './video'

export type Language = (typeof LANGUAGES)[number]

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

export interface PageDef {
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

export type Route =
  | { page: PageId; lang: Language }
  | { page: 'video'; lang: Language; video: VideoItem }
  | { page: 'production'; lang: Language; production: Production }
  | { page: 'notFound'; lang: Language }
