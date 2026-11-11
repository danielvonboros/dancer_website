import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { usePassed } from '../../hooks/usePassed'
import { useRoute } from '../../hooks/useRoute'
import { pagePath } from '../../routes'
import { SECTIONS, SECTION_LABELS } from '../../content/navigation'

/**
 * Nothing is pinned over the hero — the poster gets the whole screen.
 * The bar arrives once the hero is behind you and then stays put.
 * Pages without a hero pass `pinned`; their section links lead back to
 * the home page.
 */
export default function Nav({ pinned = false }: { pinned?: boolean }) {
  const { t } = useTranslation()
  const active = useScrollSpy(SECTIONS)
  const passed = usePassed('top')
  const visible = pinned || passed
  const [open, setOpen] = useState(false)
  const route = useRoute()
  const home = route.page === 'home' ? '' : pagePath('home', route.lang)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur transition-[transform,opacity] duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href={home || '#top'}
          className="display text-[1.35rem] leading-none tracking-tight"
        >
          Denison Silva
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label={t('nav.menu')}>
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`${home}#${id}`}
              aria-current={active === id ? 'page' : undefined}
              className={`border-b-2 pb-0.5 text-small transition-colors ${
                active === id ? 'border-violet-deep text-scrim' : 'border-transparent text-chalk hover:text-scrim'
              }`}
            >
              {t(SECTION_LABELS[id])}
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
              href={`${home}#${id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-3 text-body last:border-0"
            >
              {t(SECTION_LABELS[id])}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
