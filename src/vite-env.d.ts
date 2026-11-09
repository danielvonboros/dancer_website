/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where the contact form posts. Leave unset to fall back to mailto. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** The day of the build, YYYY-MM-DD — set in vite.config.ts. */
declare const __BUILD_DAY__: string
