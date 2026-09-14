import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Stencil from './Stencil'
import LanguageSwitcher from './LanguageSwitcher'

/**
 * Layer order, bottom to top:
 *   1. scrim grey      — the printed poster's ground, and the last fallback
 *   2. <video>         — the moving image the letters look onto
 *   3. stencil plate   — black everywhere except inside the type
 *   4. hero text       — role line, place, scroll cue
 */
export default function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  // Respect the OS setting: a looping background video is exactly the
  // kind of motion "reduce motion" is asking us not to start.
  useEffect(() => {
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (quiet.matches) {
      videoRef.current?.pause()
      setPlaying(false)
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section
      id="top"
      className="relative isolate flex h-[100svh] min-h-[34rem] w-full flex-col justify-between overflow-hidden bg-scrim"
    >
      <h1 className="sr-only">Denison Silva — {t('hero.role')}</h1>

      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      <Stencil
        lines={['Denison', 'Silva']}
        className="stencil-settle absolute inset-0 -z-0"
      />

      {/* Top rail: language only. The section nav appears after the hero. */}
      <div className="relative z-10 flex justify-end p-5 sm:p-8">
        <LanguageSwitcher tone="dark" />
      </div>

      {/* Bottom rail: who, where, and the way down. */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 p-5 sm:p-8">
        <p className="max-w-md text-small leading-snug tracking-wide text-paper sm:text-body">
          {t('hero.role')}
          <span className="block text-chalk">
            {t('hero.base')} — {t('hero.since')}
          </span>
        </p>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? t('hero.pause') : t('hero.play')}
            className="text-micro tracking-[0.18em] text-chalk uppercase transition-colors hover:text-paper"
          >
            {playing ? t('hero.pauseShort') : t('hero.playShort')}
          </button>
          <a
            href="#about"
            className="text-micro tracking-[0.18em] text-paper uppercase"
          >
            {t('hero.scroll')}
          </a>
        </div>
      </div>
    </section>
  )
}
