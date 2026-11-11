import { useTranslation } from 'react-i18next'
import { useRoute } from '../../hooks/useRoute'
import { videoPath } from '../../routes'
import { videoTitleKey } from '../../utils/videoTitleKey'
import type { VideoItem } from '../../types/video'

/** A video as a link to its own page: still, title, year and place. */
export default function VideoCard({ video }: { video: VideoItem }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const title = t(videoTitleKey(video))

  return (
    <a href={videoPath(video, lang)} className="group block">
      <div className="aspect-video w-full overflow-hidden bg-scrim">
        <img
          src={video.thumb}
          alt={`${title} — Denison Silva`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale transition-opacity group-hover:opacity-80"
        />
      </div>
      <p className="mt-3 text-body text-paper group-hover:underline">{title}</p>
      <p className="text-small text-chalk">
        {video.year} {t('videos.at')} {video.venue}
      </p>
    </a>
  )
}
