import { useTranslation } from 'react-i18next'
import CurrentMark from '../currentMark/CurrentMark'
import { VIDEOS } from '../../content/videos'
import { useRoute } from '../../hooks/useRoute'
import { productionPath, videoPath } from '../../routes'
import { findProduction } from '../../utils/findProduction'
import type { TKey } from '../../i18n'
import type { WorkItem } from '../../types/work'

/**
 * One piece of work: a photo of Denison in it, or — until there is one —
 * its name in outline type like the hero. Below: year and house, the
 * title, and his part in violet, the colour that always means "him".
 *
 * The photo lies over the outline word with an empty alt, so a photo that
 * is not uploaded yet simply shows the word underneath.
 */
export default function WorkCard({ item }: { item: WorkItem }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const production = item.production ? findProduction(item.production) : undefined
  const video = VIDEOS.find((v) => v.key === item.video)
  const href = production ? productionPath(production, lang) : video ? videoPath(video, lang) : undefined
  const Wrapper = href ? 'a' : 'div'

  return (
    <article>
      <Wrapper {...(href ? { href } : {})} className="group block">
        <div className="@container relative grid aspect-[4/3] place-items-center overflow-hidden bg-stage">
          <span aria-hidden="true" className="outline-type">
            {item.mark}
          </span>
          {item.image && (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
          )}
          {production && <CurrentMark until={production.currentUntil} className="absolute top-3 left-3" />}
        </div>
        <p className="mt-4 text-small text-chalk">
          {[item.year, item.house].filter(Boolean).join(' · ')}
        </p>
        <h4 className="mt-1 text-h3 leading-tight font-medium text-balance">
          {t(`work.items.${item.key}.title` as TKey)}
          {href && (
            <span aria-hidden="true" className="ml-2 inline-block text-signal transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </h4>
        <p className="mt-1 text-small text-signal">{t(`work.items.${item.key}.part` as TKey)}</p>
      </Wrapper>
    </article>
  )
}
