import { useEffect, useRef, useState } from 'react'

/**
 * The wordmark, cut out of a solid plate so that whatever is behind it
 * shows through the letters.
 *
 * One <mask>: a white rectangle covering the whole stage, with black
 * letterforms punching holes in it. The plate is painted through that
 * mask, so the plate exists everywhere except inside the type — and the
 * video sitting underneath is visible only inside the letters.
 *
 * The type is drawn once into a group that is rendered invisibly and
 * measured with getBBox(), then scaled to fill the stage. <use> pulls
 * that same group into the mask, so ruler and stencil can never drift
 * apart. Measuring after document.fonts.ready means a fallback face
 * never leaves the wordmark mis-sized.
 */

interface Props {
  lines: [string, string]
  /** below this width the two words stack flush left instead of ragged */
  compactBelow?: number
  className?: string
}

/** Font size used for drawing; the fit transform does the real sizing. */
const NOMINAL = 200
/** Baseline-to-baseline distance, as a multiple of NOMINAL. */
const LEADING = 0.88
/**
 * Anton's cap height as a fraction of the em. The fit is calculated
 * against the visible caps rather than getBBox(), because a font's box
 * includes ascender and descender air that all-caps type never uses —
 * fitting to that box leaves the wordmark noticeably too small.
 */
const CAP = 0.73

export default function Stencil({ lines, compactBelow = 720, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const firstLineRef = useRef<SVGTextElement>(null)
  const secondLineRef = useRef<SVGTextElement>(null)

  const [box, setBox] = useState({ w: 0, h: 0 })
  const [firstWidth, setFirstWidth] = useState(lines[0].length * NOMINAL * 0.52)
  const [fit, setFit] = useState<string>()

  // Track the element's pixel size so the viewBox matches it 1:1 — no
  // preserveAspectRatio cropping, so the type is never cut off.
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setBox({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!box.w || !box.h) return
    let cancelled = false

    const compact = box.w < compactBelow

    const layout = () => {
      if (cancelled) return
      const first = firstLineRef.current
      const group = groupRef.current
      if (!first || !group) return

      // 1. exact advance width of line one, so line two can hang off its
      //    right edge the way the printed poster sets it
      const width = first.getComputedTextLength()
      if (width) setFirstWidth(width)

      // 2. scale the visible block to fill the stage, keeping a margin
      const secondWidth = secondLineRef.current?.getComputedTextLength() ?? 0
      const blockWidth = compact ? Math.max(width, secondWidth) : width || secondWidth
      const blockHeight = (CAP + LEADING) * NOMINAL
      if (!blockWidth) return

      const marginX = box.w * (compact ? 0.04 : 0.05)
      const marginY = box.h * 0.08
      const scale = Math.min(
        (box.w - marginX * 2) / blockWidth,
        (box.h - marginY * 2) / blockHeight,
      )
      // On a tall phone screen a centred block floats; sitting it a little
      // above centre reads as a poster rather than as an accident.
      const anchorY = compact ? 0.44 : 0.5
      // The group's origin is line one's baseline, so the visible top sits
      // at -CAP em above it; shift by that to place the caps, not the box.
      const tx = (box.w - blockWidth * scale) / 2
      const ty = (box.h - blockHeight * scale) * anchorY + CAP * NOMINAL * scale
      setFit(`translate(${tx} ${ty}) scale(${scale})`)
    }

    layout()
    // Anton has to be loaded before a measurement means anything.
    void document.fonts?.ready.then(layout)

    return () => {
      cancelled = true
    }
  }, [box, lines, firstWidth, compactBelow])

  const compact = box.w > 0 && box.w < compactBelow
  const [first, second] = lines
  const over = { x: -box.w, y: -box.h, width: box.w * 3, height: box.h * 3 }

  return (
    <div ref={hostRef} className={className}>
      {box.w > 0 && (
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${box.w} ${box.h}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          {/* rendered but invisible: this copy is the ruler */}
          <g opacity="0">
            <g
              id="ds-wordmark"
              ref={groupRef}
              transform={fit}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: NOMINAL,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
            >
              <text ref={firstLineRef} x={0} y={0}>
                {first}
              </text>
              <text
                ref={secondLineRef}
                x={compact ? 0 : firstWidth}
                y={NOMINAL * LEADING}
                textAnchor={compact ? 'start' : 'end'}
              >
                {second}
              </text>
            </g>
          </g>

          <mask id="ds-stencil" maskUnits="userSpaceOnUse" {...over}>
            <rect {...over} fill="#fff" />
            <use href="#ds-wordmark" fill="#000" />
          </mask>

          <rect {...over} fill="var(--color-stage)" mask="url(#ds-stencil)" />
        </svg>
      )}
    </div>
  )
}
