import type { TKey } from '../i18n'
import type { VideoItem } from '../types/video'

/** Translation key of a video's title, e.g. videos.items.spelunkenwirt.title */
export function videoTitleKey(video: VideoItem) {
  return `videos.items.${video.key}.title` as TKey
}
