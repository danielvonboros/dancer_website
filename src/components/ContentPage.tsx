import PageShell, { PageHeader } from './PageShell'
import About from './About'
import Resume from './Resume'
import References from './References'
import { CONTENT, type ContentPageId, type ContentSection } from '../content/pages'
import { useRoute } from '../route-context'
import { PAGES } from '../routes'

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
              <Block key={section.heading} section={section} />
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

function Block({ section }: { section: ContentSection }) {
  const empty = !section.paragraphs?.length && !section.items?.length
  const external = section.link?.href.startsWith('http')

  return (
    <section className="grid gap-4 border-t border-rule pt-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <h2 className="section-title leading-tight text-balance">{section.heading}</h2>
      <div className="prose-col space-y-4">
        {section.items && (
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item} className="border-b border-rule pb-2">
                {item}
              </li>
            ))}
          </ul>
        )}
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.link && (
          <p>
            <a
              className="link-underline"
              href={section.link.href}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              {section.link.label}
            </a>
          </p>
        )}
        {empty && import.meta.env.DEV && (
          <p className="border border-dashed border-rule p-4 text-small text-chalk">
            Text to come — src/content/pages.ts
          </p>
        )}
      </div>
    </section>
  )
}
