import type { VideoItem } from '../types/video'

/** The video's page on YouTube or Vimeo. */
export function watchUrl(v: VideoItem): string {
  return v.provider === 'youtube'
    ? `https://www.youtube.com/watch?v=${v.id}`
    : `https://vimeo.com/${v.id}`
}

/** The player for the iframe; `start` jumps to a second. Cookie-free YouTube domain. */
export function embedUrl(v: VideoItem, start?: number): string {
  return v.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`
    : `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1${start ? `#t=${start}s` : ''}`
}
