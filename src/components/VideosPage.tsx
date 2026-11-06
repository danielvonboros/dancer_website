import { useTranslation } from 'react-i18next'
import PageShell, { PageHeader } from './PageShell'
import { videoTitle } from './Videos'
import { VIDEOS, type VideoItem } from '../data/media'
import { useRoute } from '../route-context'
import { videoPath } from '../routes'

/** /videos/ — every video as a link to its own page; nothing is embedded here. */
export default function VideosPage() {
  const { t } = useTranslation()

  return (
    <PageShell>
      <div className="bg-stage text-paper">
        <PageHeader tone="stage" title={t('pages.videos.h1')} lead={t('pages.videos.lead')} />
        <div className="px-5 pb-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video) => (
              <VideoCard key={video.key} video={video} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export function VideoCard({ video }: { video: VideoItem }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const title = t(videoTitle(video))

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
