import { useTranslation } from 'react-i18next'
import PageShell from '../components/pageShell/PageShell'
import PageHeader from '../components/pageHeader/PageHeader'
import VideoPlayer from '../components/videoPlayer/VideoPlayer'
import VideoCard from '../components/videoCard/VideoCard'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import FactList from '../components/factList/FactList'
import ExternalLink from '../components/externalLink/ExternalLink'
import { formatDuration } from '../utils/formatDuration'
import { videoTitleKey } from '../utils/videoTitleKey'
import { VIDEOS } from '../content/videos'
import { watchUrl } from '../utils/videoUrls'
import { type VideoItem } from '../types/video'
import { PRODUCTIONS } from '../content/productions'
import { usePagePath } from '../hooks/usePagePath'
import { useRoute } from '../hooks/useRoute'
import { productionPath } from '../routes'
import type { TKey } from '../i18n'

/**
 * One video as the main content of its own page: large player, what it
 * shows, and the facts. Google lists a video in its results mainly from a
 * page like this — the VideoObject for it is written in src/seo/videoObject.ts.
 */
export default function VideoPage({ video }: { video: VideoItem }) {
  const { t } = useTranslation()
  const path = usePagePath()
  const { lang } = useRoute()
  const production = PRODUCTIONS.find((p) => p.video === video.key)
  const others = VIDEOS.filter((v) => v.key !== video.key)

  return (
    <PageShell>
      <div className="bg-stage text-paper">
        <PageHeader tone="stage" title={t(videoTitleKey(video))}>
          <Breadcrumb
            crumbs={[
              { label: t('pages.home'), href: path('home') },
              { label: t('nav.videos'), href: path('videos') },
            ]}
          />
        </PageHeader>

        <div className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <VideoPlayer video={video} eager />

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_15rem] lg:gap-16">
              <div className="prose-col">
                <p className="text-lead leading-snug">
                  {t(`videos.items.${video.key}.description` as TKey)}
                </p>
                {production && (
                  <p className="mt-6 text-small">
                    <a className="link-underline" href={productionPath(production, lang)}>
                      {t('productions.open')}: {t(`productions.items.${production.key}.title` as TKey)}
                    </a>
                  </p>
                )}
              </div>
              <FactList
                facts={[
                  { term: t('videos.year'), detail: video.year },
                  { term: t('videos.place'), detail: video.venue },
                  { term: t('videos.length'), detail: formatDuration(video.duration) },
                ]}
              />
            </div>

            <p className="mt-10 text-small text-chalk">
              {t('videos.privacy')}{' '}
              {video.provider === 'youtube' && (
                <span className="text-paper">
                  <ExternalLink href={watchUrl(video)}>{t('videos.youtube')}</ExternalLink>
                </span>
              )}
            </p>
          </div>
        </div>

        {others.length > 0 && (
          <section className="px-5 pb-24 sm:px-8">
            <div className="mx-auto max-w-6xl border-t border-chalk/25 pt-10">
              <h2 className="section-title leading-tight">{t('videos.more')}</h2>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((other) => (
                  <VideoCard key={other.key} video={other} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageShell>
  )
}
