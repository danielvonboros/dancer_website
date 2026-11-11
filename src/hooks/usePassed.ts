import { useEffect, useState } from 'react'

/** True once the given element has scrolled out of view. */
export function usePassed(id: string) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setPassed(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return passed
}
