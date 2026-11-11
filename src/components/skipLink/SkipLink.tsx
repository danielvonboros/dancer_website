/** Invisible until focused with the keyboard: jumps past the hero to the content. */
export default function SkipLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-scrim focus:px-4 focus:py-2 focus:text-paper"
    >
      {label}
    </a>
  )
}
