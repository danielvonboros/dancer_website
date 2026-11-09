import { useTranslation } from 'react-i18next'
import PageShell, { PageHeader } from './PageShell'
import { Player, videoTitle } from './Videos'
import { VideoCard } from './VideosPage'
import { VIDEOS, watchUrl, type VideoItem } from '../data/media'
import { PRODUCTIONS } from '../data/productions'
import { usePagePath, useRoute } from '../route-context'
import { productionPath } from '../routes'
import type { TKey } from '../i18n'

/**
 * One video as the main content of its own page: large player, what it
 * shows, and the facts. Google lists a video in its results mainly from a
 * page like this — the VideoObject for it is written in src/seo/head.ts.
 */
export default function VideoPage({ video }: { video: VideoItem }) {
  const { t } = useTranslation()
  const path = usePagePath()
  const { lang } = useRoute()
  const production = PRODUCTIONS.find((p) => p.video === video.key)
  const others = VIDEOS.filter((v) => v.key !== video.key)
  const length = `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}`

  return (
    <PageShell>
      <div className="bg-stage text-paper">
        <PageHeader tone="stage" title={t(videoTitle(video))}>
          <nav aria-label={t('pages.breadcrumb')} className="mb-6 text-small text-chalk">
            <a className="link-underline" href={path('home')}>
              {t('pages.home')}
            </a>
            <span aria-hidden="true"> / </span>
            <a className="link-underline" href={path('videos')}>
              {t('nav.videos')}
            </a>
          </nav>
        </PageHeader>

        <div className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Player video={video} eager />

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
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 self-start text-small">
                <dt className="text-chalk">{t('videos.year')}</dt>
                <dd>{video.year}</dd>
                <dt className="text-chalk">{t('videos.place')}</dt>
                <dd>{video.venue}</dd>
                <dt className="text-chalk">{t('videos.length')}</dt>
                <dd>{length}</dd>
              </dl>
            </div>

            <p className="mt-10 text-small text-chalk">
              {t('videos.privacy')}{' '}
              {video.provider === 'youtube' && (
                <a
                  className="link-underline text-paper"
                  href={watchUrl(video)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t('videos.youtube')}
                </a>
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
