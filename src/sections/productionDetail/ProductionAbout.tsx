import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import FactList from '../../components/factList/FactList'
import ExternalLink from '../../components/externalLink/ExternalLink'
import { instagramUrl } from '../../utils/instagramUrl'
import type { TKey } from '../../i18n'
import type { Production } from '../../types/production'

/** What the production is and what Denison did in it, with the facts beside it. */
export default function ProductionAbout({ production }: { production: Production }) {
  const { t } = useTranslation()
  const text = (field: string) => t(`productions.items.${production.key}.${field}` as TKey)
  const { presenter, website } = production

  const facts = [
    { term: t('productions.date'), detail: text('dates') },
    { term: t('productions.place'), detail: text('place') },
    {
      term: text('presenterLabel'),
      detail: (
        <>
          {presenter.url ? <ExternalLink href={presenter.url}>{presenter.name}</ExternalLink> : presenter.name}
          {presenter.instagram && (
            <>
              {' '}
              <ExternalLink href={instagramUrl(presenter.instagram)}>@{presenter.instagram}</ExternalLink>
            </>
          )}
        </>
      ),
    },
    { term: 'Denison Silva', detail: <span className="text-signal">{text('role')}</span> },
    ...(website
      ? [
          {
            term: t('productions.website'),
            detail: <ExternalLink href={website}>{website.replace(/^https:\/\/(www\.)?/, '')}</ExternalLink>,
          },
        ]
      : []),
  ]

  return (
    <Section id="production" title={t('productions.aboutTitle')} spacing="compact">
      <div className="grid gap-10 xl:grid-cols-[1fr_17rem] xl:gap-12">
        <div className="prose-col space-y-4">
          <p>{text('p1')}</p>
          <p>{text('p2')}</p>
        </div>
        <FactList facts={facts} />
      </div>
    </Section>
  )
}
