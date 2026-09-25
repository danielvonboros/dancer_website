import { useTranslation } from 'react-i18next'
import { CONTACT } from '../data/cv'

export default function Footer() {
  const { t } = useTranslation()
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
            <a className="link-underline" href="#legal/imprint">
              {t('legal.imprint')}
            </a>
            <a className="link-underline" href="#legal/privacy">
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
        <p className="mt-8 text-micro text-chalk">
          © {year} Denison Silva. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
