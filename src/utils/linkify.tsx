import type { ReactNode } from 'react'

/**
 * Turns the URLs and email addresses inside a line into real links. A
 * privacy policy that prints a supervisory authority's URL as plain text
 * is a policy nobody follows up on.
 */
const LINK_PATTERN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g

export function linkify(line: string): ReactNode {
  const parts = line.split(LINK_PATTERN)
  if (parts.length === 1) return line

  return parts.map((part, index) => {
    if (index % 2 === 0) return part

    // A sentence-ending dot or comma is punctuation, not part of the URL.
    const match = part.replace(/[.,;:)]+$/, '')
    const trailing = part.slice(match.length)
    const isEmail = !match.startsWith('http')

    return (
      <span key={`${match}-${index}`}>
        <a
          className="link-underline break-words"
          href={isEmail ? `mailto:${match}` : match}
          {...(isEmail ? {} : { target: '_blank', rel: 'noreferrer noopener' })}
        >
          {match}
        </a>
        {trailing}
      </span>
    )
  })
}
