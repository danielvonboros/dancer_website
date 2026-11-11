import { useTranslation } from 'react-i18next'
import CurrentMark from '../currentMark/CurrentMark'
import { useCurrent } from '../../hooks/useCurrent'
import { useRoute } from '../../hooks/useRoute'
import { productionPath } from '../../routes'
import type { TKey } from '../../i18n'
import type { Production } from '../../types/production'

/**
 * The line in the hero that says what Denison is on stage with right now.
 * Renders nothing once the production's `currentUntil` day has passed.
 */
export default function NowOnStage({ production }: { production: Production }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const current = useCurrent(production.currentUntil)
  if (!current) return null

  const text = (field: string) => t(`productions.items.${production.key}.${field}` as TKey)

  return (
    <p className="flex max-w-md flex-wrap items-center gap-x-3 gap-y-2 text-small text-paper">
      <CurrentMark until={production.currentUntil} />
      <a className="link-underline" href={productionPath(production, lang)}>
        {text('title')} — {production.presenter.name}, {text('dates')}
      </a>
    </p>
  )
}
