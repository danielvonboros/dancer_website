import type { ReactNode } from 'react'
import { RouteContext } from './routeContext'
import type { Route } from '../../types/route'

/** Makes the current route available to every component below it. */
export default function RouteProvider({ route, children }: { route: Route; children: ReactNode }) {
  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>
}
