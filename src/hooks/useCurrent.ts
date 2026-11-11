import { useEffect, useState } from 'react'
import { localDay } from '../utils/localDay'

/**
 * Whether today is on or before `until` (YYYY-MM-DD). The prerendered page
 * answers for the day it was built and hydrates with the same answer; the
 * effect then asks again with the visitor's own date, so the mark comes
 * off after its last day even if nobody rebuilds the site.
 */
export function useCurrent(until?: string): boolean {
  const [today, setToday] = useState(__BUILD_DAY__)
  useEffect(() => setToday(localDay()), [])
  return until !== undefined && today <= until
}
