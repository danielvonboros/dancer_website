import PersonName from '../personName/PersonName'
import type { Credit } from '../../types/production'

/** Who made the show: names on the left, what they did on the right. Denison's row carries a violet rule. */
export default function CreditList({ credits }: { credits: Credit[] }) {
  return (
    <ul className="border-t border-rule">
      {credits.map((credit, index) => {
        const self = credit.people.some((person) => person.self)
        return (
          <li
            key={`${index}-${credit.role}`}
            className={`grid gap-x-8 gap-y-0.5 border-b py-3 sm:grid-cols-2 ${
              self ? 'border-b-2 border-violet-deep' : 'border-rule'
            }`}
          >
            <p>
              {credit.people.map((person, i) => (
                <span key={person.name}>
                  {i > 0 && ', '}
                  <PersonName person={person} />
                </span>
              ))}
            </p>
            <p className={`text-small sm:text-body ${self ? 'text-scrim' : 'text-chalk'}`}>{credit.role}</p>
          </li>
        )
      })}
    </ul>
  )
}
