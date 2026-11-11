import { useRoute } from './useRoute'
import { alternates } from '../routes'

/** The path of the current page in every language — for the language switcher. */
export function useAlternates() {
  return alternates(useRoute())
}
