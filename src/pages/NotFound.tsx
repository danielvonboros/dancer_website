import { useTranslation } from 'react-i18next'
import PageShell from '../components/pageShell/PageShell'
import PageHeader from '../components/pageHeader/PageHeader'
import { usePagePath } from '../hooks/usePagePath'

/** Rendered once to /404.html; .htaccess shows it for every unknown address. */
export default function NotFound() {
  const { t } = useTranslation()
  const path = usePagePath()

  return (
    <PageShell>
      <PageHeader title={t('pages.notFound.heading')} lead={t('pages.notFound.text')}>
        <p className="mb-6 text-small text-chalk">404</p>
      </PageHeader>
      <div className="bg-paper px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <a className="link-underline" href={path('home')}>
            {t('pages.notFound.back')}
          </a>
        </div>
      </div>
    </PageShell>
  )
}
