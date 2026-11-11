import { useTranslation } from 'react-i18next'
import PageShell from '../components/pageShell/PageShell'
import PageHeader from '../components/pageHeader/PageHeader'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import CurrentMark from '../components/currentMark/CurrentMark'
import ProductionAbout from '../sections/productionDetail/ProductionAbout'
import ProductionPhotos from '../sections/productionDetail/ProductionPhotos'
import ProductionVideo from '../sections/productionDetail/ProductionVideo'
import ProductionCredits from '../sections/productionDetail/ProductionCredits'
import { usePagePath } from '../hooks/usePagePath'
import type { TKey } from '../i18n'
import type { Production } from '../types/production'

/**
 * One production on its own page: what it is and Denison's part in it,
 * photos, video, and everyone who made it. The Event for Google is
 * written in src/seo/eventObject.ts.
 */
export default function ProductionPage({ production }: { production: Production }) {
  const { t } = useTranslation()
  const path = usePagePath()
  const text = (field: string) => t(`productions.items.${production.key}.${field}` as TKey)

  return (
    <PageShell>
      <PageHeader title={text('title')} lead={text('lead')}>
        <Breadcrumb
          crumbs={[
            { label: t('pages.home'), href: path('home') },
            { label: t('nav.cv'), href: `${path('home')}#cv` },
          ]}
        />
        <CurrentMark until={production.currentUntil} className="mb-6" />
      </PageHeader>
      <ProductionAbout production={production} />
      <ProductionPhotos production={production} />
      <ProductionVideo production={production} />
      <ProductionCredits production={production} />
    </PageShell>
  )
}
