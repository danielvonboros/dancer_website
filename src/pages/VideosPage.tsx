import { useTranslation } from 'react-i18next'
import PageShell from '../components/pageShell/PageShell'
import PageHeader from '../components/pageHeader/PageHeader'
import { VIDEOS } from '../content/videos'
import VideoCard from '../components/videoCard/VideoCard'

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
