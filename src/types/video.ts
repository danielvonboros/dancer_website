import type { Language } from './route'

/**
 * Video reel. `id` is the YouTube or Vimeo id — nothing is requested
 * from either platform until the visitor clicks play, so the site
 * ships no third-party cookies on load.
 *
 * `thumb` is a local still in /public/media so that even the preview
 * image comes from your own server. Title and description per language
 * live in src/i18n/*.json under `videos.items.<key>`.
 *
 * Each video also gets its own page at /videos/<slug>/ — a page where the
 * video is the main content is what Google shows in video results.
 * Slug pattern: <work-or-topic>-<ensemble-or-place>-<year>.
 */
export type Provider = 'youtube' | 'vimeo'

export interface VideoItem {
  key: string
  provider: Provider
  id: string
  /** file in /public/media, 16:9 */
  thumb: string
  year: number
  venue: string
  /** last path segment of the video's own page, per language */
  slug: Record<Language, string>
  /** as YouTube reports it — required for Google's VideoObject */
  uploadDate: string
  /** length in seconds */
  duration: number
  /**
   * Second where Denison's own moment starts — a button under the player
   * starts the video there. Label: videos.items.<key>.highlight
   */
  highlight?: number
}
