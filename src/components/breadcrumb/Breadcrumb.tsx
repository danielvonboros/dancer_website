import { useTranslation } from 'react-i18next'

export interface Crumb {
  label: string
  href: string
}

/** "Home / Videos" above a page title — the way back up. */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('pages.breadcrumb')} className="mb-6 text-small text-chalk">
      {crumbs.map((crumb, index) => (
        <span key={crumb.href}>
          {index > 0 && <span aria-hidden="true"> / </span>}
          <a className="link-underline" href={crumb.href}>
            {crumb.label}
          </a>
        </span>
      ))}
    </nav>
  )
}
