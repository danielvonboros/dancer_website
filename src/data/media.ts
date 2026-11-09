import type { Language } from '../routes'

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

export const VIDEOS: VideoItem[] = [
  {
    key: 'nutcracker_trailer',
    provider: 'youtube',
    id: 'S2exQc7UvkQ',
    thumb: '/media/videos/nutcracker-trailer.jpg',
    year: 2026,
    venue: 'Kino Babylon, Berlin',
    slug: {
      en: 'nutcracker-trailer-berlin-ballet-company-2026',
      de: 'nussknacker-trailer-berlin-ballet-company-2026',
      pt: 'quebra-nozes-trailer-berlin-ballet-company-2026',
    },
    uploadDate: '2026-10-07T03:21:20-07:00',
    duration: 30,
  },
  {
    key: 'cop17_opening',
    provider: 'youtube',
    id: 'EvtRwtFDRis',
    thumb: '/media/videos/cop17-opening-show.jpg',
    year: 2026,
    venue: 'COP17, Yerevan',
    slug: {
      en: 'cop17-opening-show-yerevan-2026',
      de: 'cop17-eroeffnungsshow-jerewan-2026',
      pt: 'cop17-show-de-abertura-erevan-2026',
    },
    uploadDate: '2026-10-23T08:41:00-07:00',
    duration: 3282,
    highlight: 570,
  },
  {
    key: 'spelunkenwirt',
    provider: 'youtube',
    id: 'TgsTypB3TiA',
    thumb: '/media/videos/spelunkenwirt.jpg',
    year: 2025,
    venue: 'NYC, Flensburg',
    slug: {
      en: 'spelunkenwirt-nyc-flensburg-2025',
      de: 'spelunkenwirt-nyc-flensburg-2025',
      pt: 'spelunkenwirt-nyc-flensburg-2025',
    },
    uploadDate: '2025-12-09T02:37:27-08:00',
    duration: 513,
  },
  {
    key: 'creative_process_contemporary',
    provider: 'youtube',
    id: 'PpMApZN8aDg',
    thumb: '/media/videos/creative-process.jpg',
    year: 2025,
    venue: 'NYC, Flensburg',
    slug: {
      en: 'creative-process-contemporary-nyc-flensburg-2025',
      de: 'kreativprozess-contemporary-nyc-flensburg-2025',
      pt: 'processo-criativo-contemporaneo-nyc-flensburg-2025',
    },
    uploadDate: '2025-12-09T02:37:03-08:00',
    duration: 336,
  },
  {
    key: 'pandoras_box',
    provider: 'youtube',
    id: 'sbxEoqBjrKU',
    thumb: '/media/videos/pandoras-box.jpg',
    year: 2023,
    venue: 'Centro de Artes Pavarini',
    slug: {
      en: 'pandoras-box-pavarini-sao-paulo-2023',
      de: 'pandoras-box-pavarini-sao-paulo-2023',
      pt: 'pandoras-box-pavarini-sao-paulo-2023',
    },
    uploadDate: '2026-03-26T02:00:57-07:00',
    duration: 286,
  },
]

export function watchUrl(v: VideoItem): string {
  return v.provider === 'youtube'
    ? `https://www.youtube.com/watch?v=${v.id}`
    : `https://vimeo.com/${v.id}`
}

export function embedUrl(v: VideoItem, start?: number): string {
  return v.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`
    : `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1${start ? `#t=${start}s` : ''}`
}

export interface Testimonial {
  key: string
  quote: string
  author: string
  role: string
}

/**
 * Leave empty until you have written permission to publish a quote.
 * While it is empty the References section shows the directors you
 * have worked under instead, which is honest and just as useful.
 */
export const TESTIMONIALS: Testimonial[] = []
