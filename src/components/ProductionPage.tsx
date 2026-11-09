import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import PageShell, { PageHeader } from './PageShell'
import CurrentMark from './CurrentMark'
import Gallery from './Gallery'
import { Player } from './Videos'
import { VIDEOS } from '../data/media'
import { instagramUrl, type Person, type Production } from '../data/productions'
import { usePagePath, useRoute } from '../route-context'
import { videoPath } from '../routes'
import type { TKey } from '../i18n'

/**
 * One production on its own page: what the show is, when and where,
 * the video, and everyone who made it. The Event for Google is written
 * in src/seo/head.ts.
 */
export default function ProductionPage({ production }: { production: Production }) {
  const { t } = useTranslation()
  const { lang } = useRoute()
  const path = usePagePath()
  const video = VIDEOS.find((v) => v.key === production.video)
  const text = (field: string) => t(`productions.items.${production.key}.${field}` as TKey)
  const { presenter } = production

  return (
    <PageShell>
      <PageHeader title={text('title')} lead={text('lead')}>
        <nav aria-label={t('pages.breadcrumb')} className="mb-6 text-small text-chalk">
          <a className="link-underline" href={path('home')}>
            {t('pages.home')}
          </a>
          <span aria-hidden="true"> / </span>
          <a className="link-underline" href={`${path('home')}#cv`}>
            {t('nav.cv')}
          </a>
        </nav>
        <CurrentMark until={production.currentUntil} className="mb-6" />
      </PageHeader>

      <div className="bg-paper px-5 pb-20 text-scrim sm:px-8">
        <section className="mx-auto grid max-w-6xl gap-6 border-t border-rule pt-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <h2 className="section-title leading-tight text-balance">{t('productions.aboutTitle')}</h2>
          <div className="grid gap-10 xl:grid-cols-[1fr_17rem] xl:gap-12">
            <div className="prose-col space-y-4">
              <p>{text('p1')}</p>
              <p>{text('p2')}</p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 self-start text-small">
              <dt className="text-chalk">{t('productions.date')}</dt>
              <dd>{text('dates')}</dd>
              <dt className="text-chalk">{t('productions.place')}</dt>
              <dd>{text('place')}</dd>
              <dt className="text-chalk">{text('presenterLabel')}</dt>
              <dd>
                {presenter.url ? <External href={presenter.url}>{presenter.name}</External> : presenter.name}
                {presenter.instagram && (
                  <>
                    {' '}
                    <External href={instagramUrl(presenter.instagram)}>@{presenter.instagram}</External>
                  </>
                )}
              </dd>
              <dt className="text-chalk">Denison Silva</dt>
              <dd>{text('role')}</dd>
              {production.website && (
                <>
                  <dt className="text-chalk">{t('productions.website')}</dt>
                  <dd>
                    <External href={production.website}>
                      {production.website.replace(/^https:\/\/(www\.)?/, '')}
                    </External>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </section>
      </div>

      {production.photos && (
        <section className="bg-stage px-5 pt-16 text-paper sm:px-8 sm:pt-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <h2 className="section-title leading-tight">{t('productions.photos')}</h2>
            <Gallery
              images={production.photos.map((photo) => ({
                src: photo.src,
                alt: text(`photos.${photo.key}`),
              }))}
            />
          </div>
        </section>
      )}

      {video && (
        <section className="bg-stage px-5 py-16 text-paper sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <h2 className="section-title leading-tight">{t('productions.video')}</h2>
            <div>
              <Player video={video} />
              <p className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-small text-chalk">
                <span>{t('videos.privacy')}</span>
                <a className="link-underline text-paper" href={videoPath(video, lang)}>
                  {t('videos.open')}
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="bg-paper px-5 py-20 text-scrim sm:px-8 sm:py-24">
        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <div>
            <h2 className="section-title leading-tight text-balance">{t('productions.creditsTitle')}</h2>
            <p className="mt-2 text-small text-chalk">{t('productions.creditsNote')}</p>
          </div>
          <div>
            <ul className="border-t border-rule">
              {production.credits.map((credit, index) => (
                <li
                  key={`${index}-${credit.role}`}
                  className="grid gap-x-8 gap-y-0.5 border-b border-rule py-3 sm:grid-cols-2"
                >
                  <p>
                    {credit.people.map((person, i) => (
                      <span key={person.name}>
                        {i > 0 && ', '}
                        <Name person={person} />
                      </span>
                    ))}
                  </p>
                  <p className="text-small text-chalk sm:text-body">{credit.role}</p>
                </li>
              ))}
            </ul>
            {production.music && (
              <p className="mt-6 text-small text-chalk">
                {t('productions.music')} — {production.music}
              </p>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  )
}

function Name({ person }: { person: Person }) {
  const name = person.self ? <strong className="font-semibold">{person.name}</strong> : person.name
  if (!person.instagram) return <span>{name}</span>
  return <External href={instagramUrl(person.instagram)}>{name}</External>
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="link-underline" href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}
