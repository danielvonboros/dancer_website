import type { ReactNode } from 'react'
import Nav from '../nav/Nav'
import Footer from '../footer/Footer'

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
