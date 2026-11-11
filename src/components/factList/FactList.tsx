import type { ReactNode } from 'react'

export interface Fact {
  term: string
  detail: ReactNode
}

/**
 * Short facts as label and value: year, place, length; date, venue, role.
 * `ruled` draws a hairline between rows, as in the About section.
 */
export default function FactList({ facts, ruled = false }: { facts: Fact[]; ruled?: boolean }) {
  if (ruled) {
    return (
      <dl className="text-small">
        {facts.map((fact) => (
          <div key={fact.term} className="rule flex gap-4 py-2 first:border-0">
            <dt className="w-20 shrink-0 text-chalk">{fact.term}</dt>
            <dd>{fact.detail}</dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 self-start text-small">
      {facts.map((fact) => (
        <div key={fact.term} className="contents">
          <dt className="text-chalk">{fact.term}</dt>
          <dd>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  )
}
