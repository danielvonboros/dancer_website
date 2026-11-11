import RouteProvider from './components/routeProvider/RouteProvider'
import Home from './pages/Home'
import VideosPage from './pages/VideosPage'
import VideoPage from './pages/VideoPage'
import ProductionPage from './pages/ProductionPage'
import ContentPage from './pages/ContentPage'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
import type { Route } from './types/route'

/**
 * One route per URL. Every page is prerendered to its own index.html
 * (scripts/prerender.mjs), and links between pages are plain <a> tags —
 * the site needs no client-side router and no rewrite rules on the server.
 */
export default function App({ route }: { route: Route }) {
  return <RouteProvider route={route}>{page(route)}</RouteProvider>
}

function page(route: Route) {
  switch (route.page) {
    case 'home':
      return <Home />
    case 'videos':
      return <VideosPage />
    case 'video':
      return <VideoPage video={route.video} />
    case 'production':
      return <ProductionPage production={route.production} />
    case 'imprint':
    case 'privacy':
      return <LegalPage page={route.page} />
    case 'notFound':
      return <NotFound />
    default:
      return <ContentPage page={route.page} />
  }
}
