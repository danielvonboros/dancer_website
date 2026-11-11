import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import CreditList from '../../components/creditList/CreditList'
import type { Production } from '../../types/production'

/** Cast and creative team as the production credited them. */
export default function ProductionCredits({ production }: { production: Production }) {
  const { t } = useTranslation()

  return (
    <Section id="credits" title={t('productions.creditsTitle')} note={t('productions.creditsNote')} spacing="compact">
      <CreditList credits={production.credits} />
      {production.music && (
        <p className="mt-6 text-small text-chalk">
          {t('productions.music')} — {production.music}
        </p>
      )}
    </Section>
  )
}
