import type { ReactNode } from 'react'

/** A link to another site, opened in a new tab. */
export default function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="link-underline" href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}
