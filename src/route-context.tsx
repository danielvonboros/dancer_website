import { createContext, useContext, type ReactNode } from 'react'
import { alternates, pagePath, type PageId, type Route } from './routes'

const RouteContext = createContext<Route | null>(null)

export function RouteProvider({ route, children }: { route: Route; children: ReactNode }) {
  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>
}

export function useRoute(): Route {
  const route = useContext(RouteContext)
  if (!route) throw new Error('useRoute() outside <RouteProvider>')
  return route
}

/** Path of another page in the current language. */
export function usePagePath() {
  const { lang } = useRoute()
  return (page: PageId) => pagePath(page, lang)
}

export function useAlternates() {
  return alternates(useRoute())
}
