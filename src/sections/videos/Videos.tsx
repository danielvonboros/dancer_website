import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import { VIDEOS } from '../../content/videos'
import { usePagePath } from '../../hooks/usePagePath'
import { useRoute } from '../../hooks/useRoute'
import { videoPath } from '../../routes'
import VideoFacade from '../../components/videoFacade/VideoFacade'

/**
 * Click-to-load embeds. The preview is a still served from this domain, so
 * the page makes no request to YouTube or Vimeo — and sets none of their
 * cookies — until someone actually decides to watch.
 */
export default function Videos() {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const path = usePagePath()

  return (
    <Section id="videos" title={t('videos.title')} note={t('videos.lead')} tone="stage">
      <div className="grid gap-8 sm:grid-cols-2">
        {/* With an odd number of videos the newest spans both columns,
            so the grid ends on a full row instead of a lone card. */}
        {VIDEOS.map((video, index) => (
          <figure
            key={video.key}
            className={index === 0 && VIDEOS.length % 2 === 1 ? 'sm:col-span-2' : undefined}
          >
            <VideoFacade video={video} />
            <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-small text-chalk">
              <span>
                {video.year} {t('videos.at')} {video.venue}
              </span>
              <a className="link-underline text-paper" href={videoPath(video, lang)}>
                {t('videos.open')}
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 text-small">
        <p className="text-chalk">{t('videos.privacy')}</p>
        <a className="link-underline" href={path('videos')}>
          {t('videos.all')}
        </a>
      </div>
    </Section>
  )
}
