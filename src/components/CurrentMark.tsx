import { useTranslation } from 'react-i18next'
import { useCurrent } from '../hooks/useCurrent'

/**
 * "Current" as an inverted block — the way every state on this site is
 * shown. Disappears by itself after the `until` day (YYYY-MM-DD).
 */
export default function CurrentMark({ until, className = '' }: { until?: string; className?: string }) {
  const { t } = useTranslation()
  if (!useCurrent(until)) return null

  return (
    <span
      className={`inline-block bg-scrim px-2.5 py-1 align-middle font-body text-micro leading-none font-normal tracking-[0.16em] text-paper uppercase ${className}`}
    >
      {t('productions.current')}
    </span>
  )
}
