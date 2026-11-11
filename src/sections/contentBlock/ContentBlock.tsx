import type { ContentSection } from '../../types/contentPage'

/** One section of a class, workshop or choreography page: heading on the left, text, list and link on the right. */
export default function ContentBlock({ section }: { section: ContentSection }) {
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
