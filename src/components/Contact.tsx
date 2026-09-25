import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { CONTACT } from '../data/cv'

/**
 * Posts to whatever you set in VITE_CONTACT_ENDPOINT (Formspree, Basin, a
 * small serverless handler — anything that accepts JSON). With no endpoint
 * configured the form falls back to opening the visitor's mail client, so
 * it is never a dead end. Spam is caught by a hidden field rather than a
 * captcha, which would mean loading a third party on every visit.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  const subjects = ['engagement', 'teaching', 'choreography', 'other'] as const

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (data.company) return // honeypot filled: a bot, not a person

    if (!ENDPOINT) {
      const body = `${data.message as string}\n\n— ${data.name as string} (${data.email as string})`
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        String(data.subject),
      )}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full border-b border-chalk/40 bg-transparent py-2.5 text-body text-paper placeholder:text-chalk focus:border-paper focus:outline-none'

  return (
    <Section id="contact" title={t('contact.title')} note={t('contact.lead')} tone="stage">
      <div className="grid gap-14 lg:grid-cols-[1fr_14rem]">
        <form onSubmit={handleSubmit} className="max-w-xl space-y-7" noValidate={false}>
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className="text-small text-chalk">{t('contact.name')}</span>
              <input name="name" type="text" required autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className="text-small text-chalk">{t('contact.email')}</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
          </div>

          <label className="block">
            <span className="text-small text-chalk">{t('contact.subjectLabel')}</span>
            <select name="subject" className={`${field} appearance-none`} defaultValue="engagement">
              {subjects.map((key) => (
                <option key={key} value={t(`contact.subjects.${key}` as const)} className="bg-stage">
                  {t(`contact.subjects.${key}` as const)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-small text-chalk">{t('contact.message')}</span>
            <textarea name="message" rows={5} required className={`${field} resize-y`} />
          </label>

          {/* not shown, not read by screen readers, irresistible to bots */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px opacity-0"
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-paper px-6 py-3 text-small text-stage transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {status === 'sending' ? t('contact.sending') : t('contact.send')}
          </button>

          <p aria-live="polite" className="text-small">
            {status === 'sent' && <span className="text-paper">{t('contact.sent')}</span>}
            {status === 'error' && (
              <span className="text-paper">{t('contact.error', { email: CONTACT.email })}</span>
            )}
          </p>
        </form>

        <div>
          <h3 className="text-small text-chalk">{t('contact.orDirect')}</h3>
          <dl className="mt-4 space-y-4 text-small">
            <div>
              <dt className="text-chalk">{t('contact.emailLabel')}</dt>
              <dd>
                <a className="link-underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-chalk">{t('contact.phone')}</dt>
              <dd>
                <a className="link-underline" href={`tel:${CONTACT.phoneHref}`}>
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-chalk">{t('contact.location')}</dt>
              <dd>{CONTACT.city}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}
