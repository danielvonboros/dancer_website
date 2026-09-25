/**
 * Everything the Impressum and the privacy page need, in one place.
 * Fill each TODO before the site goes live — an incomplete Impressum is
 * the single most common reason a German freelance site gets an
 * Abmahnung, and the address has to be one where post can be delivered.
 */
export const LEGAL = {
  name: 'Denison Silva',
  /** A c/o address is fine; a PO box is not. */
  street: 'TODO — Straße und Hausnummer',
  city: '10785 Berlin',
  country: 'Deutschland',
  email: 'contact@denisonsilva.com',
  phone: '+49 172 319 4331',
  /** Leave undefined if you invoice as a Kleinunternehmer under § 19 UStG. */
  vat: undefined as string | undefined,
  /** Who is responsible for the content — usually the same person. */
  editorial: 'Denison Silva',
  photographer: 'TODO — Name der Fotografin / des Fotografen',
  /** Exact company name as it appears in your all-inkl AV-Vertrag. */
  host: 'ALL-INKL.COM – Neue Medien Münnich',
  /** TODO — check in KAS how long access logs are kept and set it here. */
  logDays: 7,
} as const
