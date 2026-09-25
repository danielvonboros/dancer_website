import { useEffect, useState } from 'react'

/** Returns the id of the section currently filling most of the viewport. */
export function useScrollSpy(ids: string[], rootMargin = '-45% 0px -50% 0px') {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin, threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}

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
