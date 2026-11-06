import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/anton/400.css'
import '@fontsource-variable/archivo'
import './index.css'
import { setupI18n } from './i18n'
import App from './App'
import { pageMeta } from './seo/meta'
import { LANGUAGES, pagePath, parseRoute, resolve, type Route } from './routes'

/**
 * The prerendered page names its own route in #route, so the browser
 * hydrates exactly what was rendered — including the 404 page, which the
 * server shows at whatever address was mistyped. `yarn dev` has no
 * prerender and falls back to reading the URL.
 */
const embedded = document.getElementById('route')?.textContent
const route = (embedded && parseRoute(embedded)) || resolve(window.location.pathname)

const target = legacyRedirect(route)
if (target) {
  window.location.replace(target)
} else {
  const i18n = setupI18n(route.lang)
  const app = (
    <StrictMode>
      <App route={route} />
    </StrictMode>
  )
  const root = document.getElementById('root')!
  if (root.firstElementChild) {
    hydrateRoot(root, app)
  } else {
    document.title = pageMeta(route, i18n.getFixedT(route.lang)).title
    createRoot(root).render(app)
  }
}

/**
 * Addresses from the one-page version of the site: the legal pages lived
 * behind #legal/…, and the language was remembered in localStorage while
 * the URL stayed the same. Both now have real paths.
 */
function legacyRedirect(route: Route): string | null {
  const { hash, pathname } = window.location
  if (hash === '#legal/imprint') return pagePath('imprint', route.lang)
  if (hash === '#legal/privacy') return pagePath('privacy', route.lang)

  if (pathname === '/') {
    let stored: string | null = null
    try {
      stored = localStorage.getItem('ds-lang')
    } catch {
      // storage blocked: stay on the English home page
    }
    const lang = LANGUAGES.find((l) => l === stored)
    if (lang && lang !== 'en') return pagePath('home', lang)
  }
  return null
}
