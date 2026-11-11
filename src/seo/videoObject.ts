import type { TFunction } from 'i18next'
import { PERSON_ID } from './siteGraph'
import { ORIGIN } from '../content/routes'
import type { TKey } from '../i18n'
import type { VideoItem } from '../types/video'

/** What Google needs to list a video: the player loads only on click, so this is how it finds it. */
export function videoObject(video: VideoItem, url: string, t: TFunction): object {
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
