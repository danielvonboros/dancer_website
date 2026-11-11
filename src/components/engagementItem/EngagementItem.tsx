import { useTranslation } from 'react-i18next'
import CurrentMark from '../currentMark/CurrentMark'
import { findProduction } from '../../utils/findProduction'
import { useRoute } from '../../hooks/useRoute'
import { productionPath } from '../../routes'
import type { TKey } from '../../i18n'
import type { Engagement } from '../../types/cv'

/** One station of the CV: years and roles on the left, house, director and what he did on the right. */
export default function EngagementItem({ item }: { item: Engagement }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const production = item.production ? findProduction(item.production) : undefined

  const span = !item.to
    ? `${item.from} — ${t('cv.present')}`
    : item.from === item.to
      ? `${item.from}`
      : `${item.from} — ${item.to}`

  return (
    <li className="grid gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[7.5rem_1fr]">
      <div>
        <p className="text-small tabular-nums text-chalk">{span}</p>
        <p className="mt-1 text-small text-chalk">
          {item.roles.map((role) => t(`cv.roles.${role}` as const)).join(', ')}
        </p>
      </div>
      <div>
        <h3 className="text-h3 font-medium leading-tight">
          {item.org}
          {production && <CurrentMark until={production.currentUntil} className="ml-3" />}
        </h3>
        <p className="mt-1 text-small text-chalk">
          {item.city}, {item.country}
          {item.director && <> — {t('cv.director')}: {item.director}</>}
        </p>
        <p className="prose-col mt-3">{t(`cv.items.${item.id}` as TKey)}</p>
        {production && (
          <p className="mt-3 text-small">
            <a className="link-underline" href={productionPath(production, lang)}>
              {t('productions.open')}: {t(`productions.items.${production.key}.title` as TKey)}
            </a>
          </p>
        )}
      </div>
    </li>
  )
}
