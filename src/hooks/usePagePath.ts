import { useRoute } from './useRoute'
import { pagePath } from '../routes'
import { type PageId } from '../types/route'

/** Returns a function that gives the path of another page in the current language. */
export function usePagePath() {
  const { lang } = useRoute()
  return (page: PageId) => pagePath(page, lang)
}
