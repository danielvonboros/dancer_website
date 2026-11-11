import { useEffect, useState } from 'react'

/** Returns the id of the section currently filling most of the viewport. */
export function useScrollSpy(ids: readonly string[], rootMargin = '-45% 0px -50% 0px') {
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
