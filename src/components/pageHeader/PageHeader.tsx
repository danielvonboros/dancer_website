import type { ReactNode } from 'react'

/** The page's one h1, with the lead sentence under it. */
export default function PageHeader({
  title,
  lead,
  tone = 'paper',
  children,
}: {
  title: string
  lead?: string
  tone?: 'paper' | 'stage'
  children?: ReactNode
}) {
  const dark = tone === 'stage'
  return (
    <header
      className={`px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16 ${
        dark ? 'bg-stage text-paper' : 'bg-paper text-scrim'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {children}
        <h1 className="display text-h2 leading-none text-balance sm:text-[4rem]">{title}</h1>
        {lead && (
          <p className="prose-col mt-6 text-lead leading-snug text-balance text-chalk">{lead}</p>
        )}
      </div>
    </header>
  )
}
