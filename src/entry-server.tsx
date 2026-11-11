import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { setupI18n } from './i18n'
import { buildHead } from './seo/head'
import { allRoutes, routePath, serializeRoute } from './routes'
import { type Route } from './types/route'

export { sitemapXml } from './seo/sitemap'

/**
 * Server half of the build, used only by scripts/prerender.mjs: renders
 * one route to HTML. The 404 page comes last and is written to /404.html,
 * which .htaccess serves for every unknown address.
 */
export const routes: Route[] = [...allRoutes(), { page: 'notFound', lang: 'en' }]

export function render(route: Route) {
  const i18n = setupI18n(route.lang)
  const html = renderToString(
    <StrictMode>
      <App route={route} />
    </StrictMode>,
  )
  const path = routePath(route)
  return {
    html,
    head: buildHead(route, i18n.getFixedT(route.lang)),
    lang: route.lang,
    route: serializeRoute(route),
    // '/de/videos/' → 'de/videos/index.html', '/404.html' → '404.html'
    file: (path.endsWith('/') ? `${path}index.html` : path).slice(1),
  }
}
