import { linkify } from '../../utils/linkify'
import type { LegalSection as LegalSectionData } from '../../types/legal'

/** One heading of the imprint or privacy page: lines as paragraphs, or stacked like an address. */
export default function LegalSection({ section }: { section: LegalSectionData }) {
  const stacked = section.layout === 'stacked'

  return (
    <section>
      <h2 className="text-small text-chalk">{section.heading}</h2>

      {stacked ? (
        <p className="prose-col mt-2 leading-relaxed">
          {section.lines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {linkify(line)}
            </span>
          ))}
        </p>
      ) : (
        <div className="prose-col mt-2 space-y-3">
          {section.lines.map((line) => (
            <p key={line}>{linkify(line)}</p>
          ))}
        </div>
      )}
    </section>
  )
}
