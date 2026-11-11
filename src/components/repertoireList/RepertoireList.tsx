import { useTranslation } from 'react-i18next'
import { REPERTOIRE } from '../../content/cv'

/** Choreographers whose work he has danced. */
export default function RepertoireList() {
  const { t } = useTranslation()

  return (
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
  )
}
