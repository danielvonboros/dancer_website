import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface GalleryImage {
  src: string
  /** also the caption in the large view */
  alt: string
}

/**
 * A row of photos — four across on wide screens, two on phones. A click
 * opens the photo at full page width in a native <dialog>, which brings
 * Esc-to-close, focus handling and the backdrop for free. Thumbnails are
 * grey like the video stills; the large view shows the photo as it is.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const { t } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open !== null && !element.open) element.showModal()
    if (open === null && element.open) element.close()
  }, [open])

  const current = open === null ? null : images[open]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`${t('productions.photo')}: ${image.alt}`}
              className="group block aspect-square w-full cursor-zoom-in overflow-hidden bg-scrim"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-[filter,opacity] group-hover:grayscale-0"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(event) => event.target === event.currentTarget && setOpen(null)}
        aria-label={current?.alt}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-stage p-0 text-paper backdrop:bg-stage"
      >
        {current && (
          <div className="flex h-full flex-col" onClick={(event) => event.target === event.currentTarget && setOpen(null)}>
            <div className="flex justify-end px-5 py-4 sm:px-8">
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(null)}
                className="bg-paper px-3 py-1.5 text-micro tracking-[0.16em] text-stage uppercase"
              >
                {t('nav.close')}
              </button>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col pb-6">
              <img src={current.src} alt={current.alt} className="min-h-0 w-full flex-1 object-contain" />
              <figcaption className="mx-auto mt-4 max-w-3xl px-5 text-center text-small text-chalk sm:px-8">
                {current.alt}
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </>
  )
}
