import { useTranslation } from 'react-i18next'
import { EDUCATION } from '../../content/cv'

/** The schools he trained at, with their directors. */
export default function EducationList() {
  const { t } = useTranslation()

  return (
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
  )
}
