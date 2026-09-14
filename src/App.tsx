import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Productions from './components/Productions'
import Videos from './components/Videos'
import References from './components/References'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Legal, { type LegalPage } from './components/Legal'

/**
 * A single page with two legal sub-pages. They live behind `#legal/...`
 * rather than real paths so the site stays a static SPA that any host can
 * serve without rewrite rules — and both are still one click from every
 * screen, which is what § 5 DDG asks for.
 */
function useLegalRoute(): LegalPage | null {
  const [page, setPage] = useState<LegalPage | null>(read)

  useEffect(() => {
    const onChange = () => {
      setPage(read())
      if (read()) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return page
}

function read(): LegalPage | null {
  const hash = window.location.hash
  if (hash === '#legal/imprint') return 'imprint'
  if (hash === '#legal/privacy') return 'privacy'
  return null
}

export default function App() {
  const { t } = useTranslation()
  const legal = useLegalRoute()

  if (legal) return <Legal page={legal} />

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-scrim focus:px-4 focus:py-2 focus:text-paper"
      >
        {t('nav.about')}
      </a>
      <Nav />
      <Hero />
      <main>
        <About />
        <Resume />
        <Productions />
        <Videos />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
