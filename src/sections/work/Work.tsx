import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import WorkCard from '../../components/workCard/WorkCard'
import { WORK } from '../../content/work'
import type { WorkItem } from '../../types/work'

const GROUPS: WorkItem['role'][] = ['dancer', 'choreographer']

/**
 * What a casting office or a festival comes for: selected work as a
 * dancer and as a choreographer, each piece with his part in it.
 * The complete list follows in the CV.
 */
export default function Work() {
  const { t } = useTranslation()

  return (
    <Section id="work" title={t('work.title')} note={t('work.lead')}>
      <div className="space-y-20">
        {GROUPS.map((role) => (
          <div key={role}>
            <h3 className="display text-h2 leading-none">{t(`work.groups.${role}.title`)}</h3>
            <p className="prose-col mt-4 text-pretty">{t(`work.groups.${role}.text`)}</p>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {WORK.filter((item) => item.role === role).map((item) => (
                <WorkCard key={item.key} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
