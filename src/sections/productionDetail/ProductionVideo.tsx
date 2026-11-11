import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import { VIDEOS } from '../../content/videos'
import { useRoute } from '../../hooks/useRoute'
import { videoPath } from '../../routes'
import type { Production } from '../../types/production'

/** The production's video, with the jump to Denison's moment where there is one. */
export default function ProductionVideo({ production }: { production: Production }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const video = VIDEOS.find((v) => v.key === production.video)
  if (!video) return null

  return (
    <Section id="video" title={t('productions.video')} tone="stage" spacing="compact">
      <VideoPlayer video={video} />
      <p className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-small text-chalk">
        <span>{t('videos.privacy')}</span>
        <a className="link-underline text-paper" href={videoPath(video, lang)}>
          {t('videos.open')}
        </a>
      </p>
    </Section>
  )
}
