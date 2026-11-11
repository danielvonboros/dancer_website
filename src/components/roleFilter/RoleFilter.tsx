import { useTranslation } from 'react-i18next'
import { ROLES } from '../../content/cv'
import type { Role } from '../../types/cv'

export type RoleFilterValue = Role | 'all'

/**
 * Casting people arrive looking for one of three careers. The filter
 * answers that in one click instead of three scrolls. The active choice
 * is a violet block, hover a light violet tint — violet is the site's highlight.
 */
export default function RoleFilter({
  value,
  onChange,
}: {
  value: RoleFilterValue
  onChange: (value: RoleFilterValue) => void
}) {
  const { t } = useTranslation()
  const options: RoleFilterValue[] = ['all', ...ROLES]

  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-2 gap-y-2">
      <span className="mr-2 text-small text-chalk">{t('cv.filterLabel')}</span>
      {options.map((key) => {
        const isActive = value === key
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 text-small transition-colors ${
              isActive ? 'bg-violet-deep text-paper' : 'text-chalk hover:bg-violet-deep/10 hover:text-violet-deep'
            }`}
          >
            {key === 'all' ? t('cv.all') : t(`cv.roles.${key}` as const)}
          </button>
        )
      })}
    </div>
  )
}
