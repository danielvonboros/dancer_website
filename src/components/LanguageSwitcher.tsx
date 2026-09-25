import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '../i18n'

/**
 * Three letters, no flags — a flag stands for a country, not a language,
 * and Portuguese here means Brazil and Portugal both. The active language
 * is marked by inversion, which is how every state on this site is shown.
 */
export default function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage as Language

  const idle = tone === 'dark' ? 'text-chalk hover:text-paper' : 'text-chalk hover:text-scrim'
  const active = tone === 'dark' ? 'bg-paper text-stage' : 'bg-scrim text-paper'

  return (
    <nav aria-label={t('lang.label')} className="flex items-center gap-1">
      {LANGUAGES.map((lng) => {
        const isCurrent = current === lng
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => void i18n.changeLanguage(lng)}
            className={`px-2 py-1 text-micro tracking-[0.16em] transition-colors ${
              isCurrent ? active : idle
            }`}
          >
            {t(`lang.${lng}` as const)}
          </button>
        )
      })}
    </nav>
  )
}
