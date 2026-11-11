import { createContext } from 'react'
import type { Route } from '../../types/route'

/** The page being shown — set once by RouteProvider, read with useRoute(). */
export const RouteContext = createContext<Route | null>(null)
