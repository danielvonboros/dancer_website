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
import Legal from './components/Legal'
import VideosPage from './components/VideosPage'
import VideoPage from './components/VideoPage'
import ProductionPage from './components/ProductionPage'
import ContentPage from './components/ContentPage'
import NotFound from './components/NotFound'
import { RouteProvider } from './route-context'
import type { Route } from './routes'

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
      return <Legal page={route.page} />
    case 'notFound':
      return <NotFound />
    default:
      return <ContentPage page={route.page} />
  }
}

function Home() {
  const { t } = useTranslation()

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
