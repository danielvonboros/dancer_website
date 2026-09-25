import { useTranslation } from 'react-i18next'
import Section from './Section'
import { ENGAGEMENTS } from '../data/cv'
import { TESTIMONIALS } from '../data/media'

/**
 * Until there are quotes to publish, this section shows the people he has
 * actually worked under, which is what a theatre wants to see anyway.
 */
export default function References() {
  const { t } = useTranslation()

  const directors = ENGAGEMENTS.filter((item) => item.director).map((item) => ({
    id: item.id,
    name: item.director as string,
    org: item.org,
    city: item.city,
    from: item.from,
    to: item.to,
  }))

  return (
    <Section
      id="references"
      title={t('references.title')}
      note={TESTIMONIALS.length ? t('references.quoteLead') : t('references.lead')}
    >
      {TESTIMONIALS.length > 0 && (
        <div className="mb-14 space-y-10">
          {TESTIMONIALS.map((quote) => (
            <blockquote key={quote.key} className="prose-col">
              <p className="text-lead leading-snug text-balance">{quote.quote}</p>
              <footer className="mt-3 text-small text-chalk">
                {quote.author} — {quote.role}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      <ul className="border-t border-rule">
        {directors.map((director) => (
          <li
            key={director.id}
            className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[7.5rem_1fr]"
          >
            <p className="text-small tabular-nums text-chalk">
              {director.to && director.to !== director.from
                ? `${director.from}–${director.to}`
                : director.from}
            </p>
            <p>
              {director.name}
              <span className="text-chalk"> — {director.org}, {director.city}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-small text-chalk">{t('references.onRequest')}</p>
    </Section>
  )
}
