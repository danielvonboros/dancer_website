import { PRODUCTIONS } from '../content/productions'
import type { Production } from '../types/production'

/** The production with this key, or undefined. */
export function findProduction(key: string): Production | undefined {
  return PRODUCTIONS.find((production) => production.key === key)
}
