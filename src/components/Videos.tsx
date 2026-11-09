import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { VIDEOS, embedUrl, type VideoItem } from '../data/media'
import { usePagePath, useRoute } from '../route-context'
import { videoPath } from '../routes'
import type { TKey } from '../i18n'

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
            <Facade video={video} />
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

export function videoTitle(video: VideoItem) {
  return `videos.items.${video.key}.title` as TKey
}

/**
 * The player with, where the video has one, a second button that starts
 * it at Denison's own moment (`highlight` in src/data/media.ts). Still
 * nothing is loaded from YouTube until one of the two is pressed.
 */
export function Player({ video, eager = false }: { video: VideoItem; eager?: boolean }) {
  const { t } = useTranslation()
  const [start, setStart] = useState<number>()

  return (
    <>
      <Facade key={start ?? 0} video={video} eager={eager} start={start} />
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

/**
 * `eager` on a video's own page, where the still is the first thing in view.
 * A `start` second loads the player right away and plays from there.
 */
export function Facade({
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
  const title = t(videoTitle(video))

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
