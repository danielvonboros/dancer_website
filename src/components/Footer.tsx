import { useTranslation } from 'react-i18next'
import { CONTACT } from '../data/cv'
import { usePagePath } from '../route-context'
import { isLive, PAGES, type PageId } from '../routes'
import type { TKey } from '../i18n'

/** Pages linked from every footer — a draft joins the list once it is published. */
const SITE_PAGES = (Object.keys(PAGES) as PageId[]).filter(
  (page) => page !== 'home' && !PAGES[page].noindex && isLive(page),
)

export default function Footer() {
  const { t } = useTranslation()
  const path = usePagePath()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stage px-5 pb-10 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl border-t border-chalk/25 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="text-small text-chalk">
            Denison Silva
            <span className="block">{t('footer.tagline')}</span>
          </p>
          <nav className="flex flex-wrap items-center gap-6 text-small">
            <a className="link-underline" href={path('imprint')}>
              {t('legal.imprint')}
            </a>
            <a className="link-underline" href={path('privacy')}>
              {t('legal.privacy')}
            </a>
            <a className="link-underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="link-underline" href="#top">
              {t('footer.toTop')}
            </a>
          </nav>
        </div>
        <nav
          aria-label={t('pages.footerNav')}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-small text-chalk"
        >
          <a className="link-underline" href={path('home')}>
            {t('pages.home')}
          </a>
          {SITE_PAGES.map((page) => (
            <a key={page} className="link-underline" href={path(page)}>
              {t(`pages.labels.${page}` as TKey)}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-micro text-chalk">
          © {year} Denison Silva. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
