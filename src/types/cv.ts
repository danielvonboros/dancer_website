export type Role = 'dancer' | 'teacher' | 'choreographer'

export interface Engagement {
  id: string
  org: string
  city: string
  country: string
  from: number
  /** omit for an ongoing engagement */
  to?: number
  roles: Role[]
  director?: string
  productions?: string[]
  /** key in PRODUCTIONS (src/data/productions.ts) — links the entry to its own page */
  production?: string
}

export interface Education {
  id: string
  school: string
  city: string
  country: string
  from: number
  to: number
  director: string
}
