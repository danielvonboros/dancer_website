/**
 * Video reel. `id` is the YouTube or Vimeo id — nothing is requested
 * from either platform until the visitor clicks play, so the site
 * ships no third-party cookies on load.
 *
 * Replace these with real ids; `thumb` is a local still in /public/media
 * so that even the preview image comes from your own server.
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
}

export const VIDEOS: VideoItem[] = [
  {
    key: 'spelunkenwirt',
    provider: 'youtube',
    id: 'TgsTypB3TiA',
    thumb: '/media/still-oxum.jpg',
    year: 2025,
    venue: 'NYC, Flensburg',
  },
  {
    key: 'creative_process_contemporary',
    provider: 'youtube',
    id: 'PpMApZN8aDg',
    thumb: '/media/still-ellis.jpg',
    year: 2025,
    venue: 'NYC, Flensburg',
  },
  {
    key: 'pandoras_box',
    provider: 'youtube',
    id: 'sbxEoqBjrKU',
    thumb: '/media/still-prometheus.jpg',
    year: 2023,
    venue: 'Centro de Artes Pavarini',
  },
]

export function embedUrl(v: VideoItem): string {
  return v.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1`
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
