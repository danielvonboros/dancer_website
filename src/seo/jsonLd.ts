/** The structured data as a <script> tag; `<` is escaped so the JSON cannot close the tag. */
export function jsonLd(graph: object[]): string {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`
}
