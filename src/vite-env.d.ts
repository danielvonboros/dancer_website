/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where the contact form posts. Leave unset to fall back to mailto. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
