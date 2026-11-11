import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/languageSwitcher/LanguageSwitcher'
import LegalSection from '../components/legalSection/LegalSection'
import { usePagePath } from '../hooks/usePagePath'
import { useRoute } from '../hooks/useRoute'
import { resolveLegal } from '../utils/resolveLegal'

export type LegalPageId = 'imprint' | 'privacy'

/** Imprint or privacy policy — plain, without the site's nav, as the law expects it findable. */
export default function LegalPage({ page }: { page: LegalPageId }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const path = usePagePath()
  const legal = resolveLegal(lang)
  const content = page === 'imprint' ? legal.imprint : legal.privacy

  return (
    <main className="min-h-screen bg-paper px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <a href={path('home')} className="link-underline text-small">
            {t('legal.back')}
          </a>
          <LanguageSwitcher />
        </div>
        <article lang={legal.locale}>
          <h1 className="display mt-12 text-h2 leading-none">{content.title}</h1>

          {legal.notice && (
            <p className="mt-5 border-l-2 border-rule pl-4 text-small text-chalk">{legal.notice}</p>
          )}

          <div className="mt-10 space-y-9">
            {content.sections.map((section) => (
              <LegalSection key={section.heading} section={section} />
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
