import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import FactList from '../../components/factList/FactList'
import { CONTACT } from '../../content/cv'

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
          <div className="mt-6">
            <FactList facts={facts} ruled />
          </div>
        </div>
      </div>
    </Section>
  )
}
