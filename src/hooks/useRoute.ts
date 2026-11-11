import { useContext } from 'react'
import { RouteContext } from '../components/routeProvider/routeContext'
import type { Route } from '../types/route'

/** The page being shown: its id, its language and, on detail pages, its video or production. */
export function useRoute(): Route {
  const route = useContext(RouteContext)
  if (!route) throw new Error('useRoute() outside <RouteProvider>')
  return route
}
