import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../content/routes'
import { useAlternates } from '../../hooks/useAlternates'
import { useRoute } from '../../hooks/useRoute'

/**
 * Three letters, no flags — a flag stands for a country, not a language,
 * and Portuguese here means Brazil and Portugal both. The active language
 * is marked by inversion, which is how every state on this site is shown.
 *
 * Each language is a real link to the same page in that language, so
 * crawlers find every version. The choice is remembered for the next
 * visit to the bare domain (see legacyRedirect in main.tsx).
 */
export default function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { t } = useTranslation()
  const { lang: current } = useRoute()
  const paths = useAlternates()

  const idle = tone === 'dark' ? 'text-chalk hover:text-paper' : 'text-chalk hover:text-scrim'
  const active = tone === 'dark' ? 'bg-paper text-stage' : 'bg-scrim text-paper'

  return (
    <nav aria-label={t('lang.label')} className="flex items-center gap-1">
      {LANGUAGES.map((lng) => {
        const isCurrent = current === lng
        return (
          <a
            key={lng}
            href={paths[lng]}
            hrefLang={lng}
            lang={lng}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => remember(lng)}
            className={`px-2 py-1 text-micro tracking-[0.16em] transition-colors ${
              isCurrent ? active : idle
            }`}
          >
            {t(`lang.${lng}` as const)}
          </a>
        )
      })}
    </nav>
  )
}

function remember(lng: string) {
  try {
    localStorage.setItem('ds-lang', lng)
  } catch {
    // storage blocked: the link still works, the choice just isn't kept
  }
}
