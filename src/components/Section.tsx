import type { ReactNode } from 'react'

/**
 * The page's one structural idea, borrowed from the printed CV: a narrow
 * left rail carrying the section name and one fact that is actually true
 * of that section, with the content set against it.
 */
interface Props {
  id: string
  title: string
  /** a real fact — a year span, a count, a place. Never a decorative label. */
  note?: string
  tone?: 'paper' | 'stage'
  children: ReactNode
}

export default function Section({ id, title, note, tone = 'paper', children }: Props) {
  const dark = tone === 'stage'
  return (
    <section
      id={id}
      className={`scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28 lg:py-36 ${
        dark ? 'bg-stage text-paper' : 'bg-paper text-scrim'
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-20 lg:self-start lg:pt-2">
          <h2 className="section-title leading-tight text-balance">{title}</h2>
          {note && (
            <p className={`mt-2 text-small ${dark ? 'text-chalk' : 'text-chalk'}`}>{note}</p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}
