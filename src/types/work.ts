/** One piece in the Work section on the home page. */
export interface WorkItem {
  /** names the texts in src/i18n/*.json: work.items.<key>.title and .part */
  key: string
  /** which column it stands in */
  role: 'dancer' | 'choreographer'
  /** the company or house, and the city */
  house: string
  /** "2026", "2011–2012"; left out where the exact year is not known */
  year?: string
  /** a photo of Denison in it, 4:3 or wider. Without one, `mark` is set in outline type. */
  image?: string
  /** one word in outline type, like the name in the hero — shown when there is no photo yet */
  mark: string
  /** key in PRODUCTIONS — the card links to the production page and shows "Current" */
  production?: string
  /** key in VIDEOS — the card links to the video page */
  video?: string
}
