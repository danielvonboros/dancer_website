import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'

/**
 * Frame for every page except the home page: the nav bar pinned from the
 * start (there is no hero to scroll past), the content, the footer.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav pinned />
      <main className="pt-14">{children}</main>
      <Footer />
    </>
  )
}

/** The page's one h1, with the lead sentence under it. */
export function PageHeader({
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
