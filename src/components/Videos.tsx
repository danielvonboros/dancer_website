import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { VIDEOS, embedUrl, type VideoItem } from '../data/media'
import type { TKey } from '../i18n'

/**
 * Click-to-load embeds. The preview is a still served from this domain, so
 * the page makes no request to YouTube or Vimeo — and sets none of their
 * cookies — until someone actually decides to watch.
 */
export default function Videos() {
  const { t } = useTranslation()

  return (
    <Section id="videos" title={t('videos.title')} note={t('videos.lead')} tone="stage">
      <div className="grid gap-8 sm:grid-cols-2">
        {VIDEOS.map((video) => (
          <Facade key={video.key} video={video} />
        ))}
      </div>
      <p className="mt-8 text-small text-chalk">{t('videos.privacy')}</p>
    </Section>
  )
}

function Facade({ video }: { video: VideoItem }) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  const title = t(`videos.items.${video.key}` as TKey, { defaultValue: video.venue })

  return (
    <figure>
      <div className="relative aspect-video w-full bg-scrim">
        {loaded ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl(video)}
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
              loading="lazy"
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
      <figcaption className="mt-3 text-small text-chalk">
        {video.year} {t('videos.at')} {video.venue}
      </figcaption>
    </figure>
  )
}
