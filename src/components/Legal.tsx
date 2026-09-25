import { useTranslation } from 'react-i18next'
import { LEGAL } from '../data/legal'
import LanguageSwitcher from './LanguageSwitcher'

export type LegalPage = 'imprint' | 'privacy'

export default function Legal({ page }: { page: LegalPage }) {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-paper px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="link-underline text-small">
            {t('legal.back')}
          </a>
          <LanguageSwitcher />
        </div>

        <h1 className="display mt-12 text-h2 leading-none">
          {page === 'imprint' ? t('legal.imprintTitle') : t('legal.privacyTitle')}
        </h1>

        {page === 'imprint' ? <Imprint /> : <Privacy />}
      </div>
    </main>
  )
}

function Imprint() {
  const { t } = useTranslation()
  return (
    <div className="mt-10 space-y-8">
      <section>
        <h2 className="text-small text-chalk">{t('legal.responsible')}</h2>
        <address className="mt-2 not-italic">
          {LEGAL.name}
          <br />
          {LEGAL.street}
          <br />
          {LEGAL.city}
          <br />
          {LEGAL.country}
        </address>
      </section>

      <section>
        <h2 className="text-small text-chalk">{t('legal.contactHeading')}</h2>
        <p className="mt-2">
          <a className="link-underline" href={`mailto:${LEGAL.email}`}>
            {LEGAL.email}
          </a>
          <br />
          {LEGAL.phone}
        </p>
      </section>

      {LEGAL.vat && (
        <section>
          <h2 className="text-small text-chalk">{t('legal.vatHeading')}</h2>
          <p className="mt-2">{t('legal.vatBody', { vat: LEGAL.vat })}</p>
        </section>
      )}

      <section>
        <h2 className="text-small text-chalk">{t('legal.editorialHeading')}</h2>
        <p className="mt-2">
          {LEGAL.editorial}, {LEGAL.street}, {LEGAL.city}
        </p>
      </section>

      <section>
        <h2 className="text-small text-chalk">{t('legal.disputeHeading')}</h2>
        <p className="mt-2">{t('legal.disputeBody')}</p>
      </section>

      <section>
        <h2 className="text-small text-chalk">{t('legal.creditsHeading')}</h2>
        <p className="mt-2">{t('legal.creditsBody', { photographer: LEGAL.photographer })}</p>
      </section>
    </div>
  )
}

function Privacy() {
  const { t } = useTranslation()
  const blocks = [
    { heading: 'legal.privacyHostHeading', body: 'legal.privacyHostBody' },
    { heading: 'legal.privacyFormHeading', body: 'legal.privacyFormBody' },
    { heading: 'legal.privacyVideoHeading', body: 'legal.privacyVideoBody' },
    { heading: 'legal.privacyRightsHeading', body: 'legal.privacyRightsBody' },
  ] as const

  return (
    <div className="mt-10 space-y-8">
      <p className="text-lead leading-snug">{t('legal.privacyIntro')}</p>

      <section>
        <h2 className="text-small text-chalk">{t('legal.responsible')}</h2>
        <address className="mt-2 not-italic">
          {LEGAL.name}, {LEGAL.street}, {LEGAL.city} — {LEGAL.email}
        </address>
      </section>

      {blocks.map((block) => (
        <section key={block.heading}>
          <h2 className="text-small text-chalk">{t(block.heading)}</h2>
          <p className="mt-2">
            {t(block.body, { host: LEGAL.host, logDays: LEGAL.logDays })}
          </p>
        </section>
      ))}
    </div>
  )
}
