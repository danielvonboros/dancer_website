import { useTranslation } from 'react-i18next'
import Section from './Section'
import { ROLES } from '../data/cv'

/**
 * The same career told three ways. These are the three summaries from the
 * printed CV, one block per role, so that a school, a casting office and a
 * festival each find their own paragraph without reading the other two.
 */
export default function Productions() {
  const { t } = useTranslation()

  return (
    <Section id="productions" title={t('work.title')} note={t('work.lead')}>
      <div className="space-y-12">
        {ROLES.map((role) => (
          <article key={role} className="rule pt-7 first:border-0 first:pt-0">
            <h3 className="display text-h2 leading-none">{t(`cv.roles.${role}` as const)}</h3>
            <p className="prose-col mt-5 text-pretty">{t(`work.${role}` as const)}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
