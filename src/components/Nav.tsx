import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { useScrollSpy, usePassed } from '../hooks/useScrollSpy'
import type { TKey } from '../i18n'

export const SECTIONS = ['about', 'cv', 'productions', 'videos', 'references', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

const LABEL = {
  about: 'nav.about',
  cv: 'nav.cv',
  productions: 'nav.work',
  videos: 'nav.videos',
  references: 'nav.references',
  contact: 'nav.contact',
} as const satisfies Record<SectionId, TKey>

/**
 * Nothing is pinned over the hero — the poster gets the whole screen.
 * The bar arrives once the hero is behind you and then stays put.
 */
export default function Nav() {
  const { t } = useTranslation()
  const active = useScrollSpy([...SECTIONS])
  const visible = usePassed('top')
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur transition-[transform,opacity] duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="display text-[1.35rem] leading-none tracking-tight"
        >
          Denison Silva
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label={t('nav.menu')}>
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'page' : undefined}
              className={`text-small transition-colors ${
                active === id ? 'text-scrim' : 'text-chalk hover:text-scrim'
              }`}
            >
              {t(LABEL[id])}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="px-2 py-1 text-micro tracking-[0.16em] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t('nav.menu')}
          className="border-t border-rule px-5 pb-4 md:hidden"
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-3 text-body last:border-0"
            >
              {t(LABEL[id])}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
