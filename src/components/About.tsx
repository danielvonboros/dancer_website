import { useTranslation } from 'react-i18next'
import Section from './Section'
import { CONTACT } from '../data/cv'

export default function About() {
  const { t } = useTranslation()

  const facts = [
    { term: t('about.born'), detail: t('about.bornValue') },
    { term: t('about.based'), detail: t('about.basedValue') },
    { term: t('about.teaches'), detail: t('about.teachesValue') },
    { term: t('about.languages'), detail: CONTACT.languages.join(', ') },
  ]

  return (
    <Section id="about" title={t('about.title')}>
      <div className="grid gap-12 md:grid-cols-[1fr_15rem] md:gap-14">
        <div>
          <p className="prose-col text-lead leading-snug text-balance">{t('about.lead')}</p>
          <div className="prose-col mt-8 space-y-5">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </div>

        <div>
          <img
            src="/media/portrait.jpg"
            alt={t('about.portraitAlt')}
            width={640}
            height={601}
            loading="lazy"
            decoding="async"
            className="w-full object-cover grayscale"
          />
          <dl className="mt-6 text-small">
            {facts.map((fact) => (
              <div key={fact.term} className="rule flex gap-4 py-2 first:border-0">
                <dt className="w-20 shrink-0 text-chalk">{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
