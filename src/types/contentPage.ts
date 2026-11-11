import type { PageId } from './route'

export interface PageContent {
  /** <title> — about 60 characters, main search term first */
  title: string
  /** meta description — about 150 characters */
  description: string
  h1: string
  lead: string
  sections: ContentSection[]
}

export interface ContentSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
  link?: { label: string; href: string }
}

export type ContentPageId = Exclude<PageId, 'home' | 'videos' | 'imprint' | 'privacy'>
