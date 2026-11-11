import ExternalLink from '../externalLink/ExternalLink'
import { instagramUrl } from '../../utils/instagramUrl'
import type { Person } from '../../types/production'

/** A name in a cast list — linked to Instagram where there is a handle, violet for Denison. */
export default function PersonName({ person }: { person: Person }) {
  const name = person.self ? (
    <strong className="font-semibold text-signal">{person.name}</strong>
  ) : (
    person.name
  )
  if (!person.instagram) return <span>{name}</span>
  return <ExternalLink href={instagramUrl(person.instagram)}>{name}</ExternalLink>
}
