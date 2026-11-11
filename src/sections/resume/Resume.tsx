import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import RoleFilter, { type RoleFilterValue } from '../../components/roleFilter/RoleFilter'
import EngagementItem from '../../components/engagementItem/EngagementItem'
import EducationList from '../../components/educationList/EducationList'
import RepertoireList from '../../components/repertoireList/RepertoireList'
import { ENGAGEMENTS } from '../../content/cv'

/** The full CV: every engagement with a role filter, then training and repertoire. */
export default function Resume() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<RoleFilterValue>('all')

  const shown = useMemo(
    () => (filter === 'all' ? ENGAGEMENTS : ENGAGEMENTS.filter((item) => item.roles.includes(filter))),
    [filter],
  )

  return (
    <Section id="cv" title={t('cv.title')} note={t('cv.lead')}>
      <RoleFilter value={filter} onChange={setFilter} />

      <ol className="border-t border-rule">
        {shown.map((item) => (
          <EngagementItem key={item.id} item={item} />
        ))}
      </ol>

      {shown.length === 0 && <p className="py-8 text-chalk">{t('cv.empty')}</p>}

      <div className="mt-14 grid gap-12 sm:grid-cols-2">
        <EducationList />
        <RepertoireList />
      </div>

      <p className="mt-12">
        <a className="link-underline text-small" href="/denison-silva-cv.pdf" download>
          {t('cv.download')}
        </a>
      </p>
    </Section>
  )
}
