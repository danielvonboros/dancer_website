import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import VideoFacade from '../videoFacade/VideoFacade'
import type { TKey } from '../../i18n'
import type { VideoItem } from '../../types/video'

/**
 * The player with, where the video has one, a second button that starts
 * it at Denison's own moment (`highlight` in src/content/videos.ts). Still
 * nothing is loaded from YouTube until one of the two is pressed.
 */
export default function VideoPlayer({ video, eager = false }: { video: VideoItem; eager?: boolean }) {
  const { t } = useTranslation()
  const [start, setStart] = useState<number>()

  return (
    <>
      <VideoFacade key={start ?? 0} video={video} eager={eager} start={start} />
      {video.highlight !== undefined && (
        <button
          type="button"
          onClick={() => setStart(video.highlight)}
          className="mt-4 bg-paper px-3 py-1.5 text-micro tracking-[0.16em] text-stage uppercase transition-opacity hover:opacity-80"
        >
          ▶ {t(`videos.items.${video.key}.highlight` as TKey)}
        </button>
      )}
    </>
  )
}
