import PageShell from '../components/pageShell/PageShell'
import PageHeader from '../components/pageHeader/PageHeader'
import About from '../sections/about/About'
import Resume from '../sections/resume/Resume'
import References from '../sections/references/References'
import ContentBlock from '../sections/contentBlock/ContentBlock'
import { CONTENT } from '../content/pages'
import { type ContentPageId } from '../types/contentPage'
import { useRoute } from '../hooks/useRoute'
import { PAGES } from '../content/routes'

/**
 * Template for the class, workshop and choreography pages: h1 and lead,
 * then one block per section from src/content/pages.ts. The dancer page
 * reuses the CV sections of the home page as its body.
 */
export default function ContentPage({ page }: { page: ContentPageId }) {
  const { lang } = useRoute()
  const content = CONTENT[page][lang]

  return (
    <PageShell>
      <PageHeader title={content.h1} lead={content.lead}>
        {PAGES[page].draft && (
          <p className="mb-6 inline-block bg-scrim px-3 py-1 text-micro tracking-[0.16em] text-paper uppercase">
            Draft — visible in yarn dev only
          </p>
        )}
      </PageHeader>

      {content.sections.length > 0 && (
        <div className="bg-paper px-5 pb-24 text-scrim sm:px-8">
          <div className="mx-auto max-w-6xl space-y-14">
            {content.sections.map((section) => (
              <ContentBlock key={section.heading} section={section} />
            ))}
          </div>
        </div>
      )}

      {page === 'dancer' && (
        <>
          <About />
          <Resume />
          <References />
        </>
      )}
    </PageShell>
  )
}
