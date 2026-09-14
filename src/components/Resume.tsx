import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { ENGAGEMENTS, EDUCATION, REPERTOIRE, ROLES, type Role } from '../data/cv'
import type { TKey } from '../i18n'

type Filter = Role | 'all'

export default function Resume() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')

  const shown = useMemo(
    () =>
      filter === 'all'
        ? ENGAGEMENTS
        : ENGAGEMENTS.filter((item) => item.roles.includes(filter)),
    [filter],
  )

  const span = (from: number, to?: number) => {
    if (!to) return `${from} — ${t('cv.present')}`
    return from === to ? `${from}` : `${from} — ${to}`
  }

  const filters: Filter[] = ['all', ...ROLES]

  return (
    <Section id="cv" title={t('cv.title')} note={t('cv.lead')}>
      {/* Casting people arrive looking for one of three careers.
          The filter answers that in one click instead of three scrolls. */}
      <div className="mb-10 flex flex-wrap items-baseline gap-x-2 gap-y-2">
        <span className="mr-2 text-small text-chalk">{t('cv.filterLabel')}</span>
        {filters.map((key) => {
          const isActive = filter === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-small transition-colors ${
                isActive
                  ? 'bg-scrim text-paper'
                  : 'text-chalk hover:bg-rule/50 hover:text-scrim'
              }`}
            >
              {key === 'all' ? t('cv.all') : t(`cv.roles.${key}` as const)}
            </button>
          )
        })}
      </div>

      <ol className="border-t border-rule">
        {shown.map((item) => (
          <li
            key={item.id}
            className="grid gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[7.5rem_1fr]"
          >
            <div>
              <p className="text-small tabular-nums text-chalk">{span(item.from, item.to)}</p>
              <p className="mt-1 text-small text-chalk">
                {item.roles.map((role) => t(`cv.roles.${role}` as const)).join(', ')}
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-medium leading-tight">{item.org}</h3>
              <p className="mt-1 text-small text-chalk">
                {item.city}, {item.country}
                {item.director && <> — {t('cv.director')}: {item.director}</>}
              </p>
              <p className="prose-col mt-3">{t(`cv.items.${item.id}` as TKey)}</p>
            </div>
          </li>
        ))}
      </ol>

      {shown.length === 0 && <p className="py-8 text-chalk">{t('cv.empty')}</p>}

      <div className="mt-14 grid gap-12 sm:grid-cols-2">
        <div>
          <h3 className="section-title text-h3">{t('cv.educationTitle')}</h3>
          <ul className="mt-5 border-t border-rule">
            {EDUCATION.map((school) => (
              <li key={school.id} className="border-b border-rule py-4">
                <p className="text-body">{school.school}</p>
                <p className="text-small text-chalk">
                  {school.city}, {school.country} — {school.from}–{school.to}
                </p>
                <p className="text-small text-chalk">
                  {t('cv.director')}: {school.director}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="section-title text-h3">{t('cv.repertoireTitle')}</h3>
          <ul className="mt-5 border-t border-rule">
            {REPERTOIRE.map((name) => (
              <li key={name} className="border-b border-rule py-2 text-small">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-12">
        <a
          className="link-underline text-small"
          href="/denison-silva-cv.pdf"
          download
        >
          {t('cv.download')}
        </a>
      </p>
    </Section>
  )
}
