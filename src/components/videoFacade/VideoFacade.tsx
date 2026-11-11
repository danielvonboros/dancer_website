import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { embedUrl } from '../../utils/videoUrls'
import { videoTitleKey } from '../../utils/videoTitleKey'
import type { VideoItem } from '../../types/video'

/**
 * Click-to-load embed. The preview is a still served from this domain, so
 * the page makes no request to YouTube or Vimeo — and sets none of their
 * cookies — until someone actually decides to watch.
 *
 * `eager` on a video's own page, where the still is the first thing in view.
 * A `start` second loads the player right away and plays from there.
 */
export default function VideoFacade({
  video,
  eager = false,
  start,
}: {
  video: VideoItem
  eager?: boolean
  start?: number
}) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(start !== undefined)
  const title = t(videoTitleKey(video))

  return (
    <div className="relative aspect-video w-full bg-scrim">
      {loaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl(video, start)}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={video.thumb}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            className="h-full w-full object-cover grayscale transition-opacity group-hover:opacity-80"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-left">
            <span className="text-small text-paper">{title}</span>
            <span className="bg-paper px-3 py-1.5 text-micro tracking-[0.16em] text-stage uppercase">
              {t('videos.play')}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
