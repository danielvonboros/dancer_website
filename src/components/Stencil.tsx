import { useEffect, useRef, useState } from "react";

interface Props {
  lines: [string, string];
  /** below this width the two words stack flush left instead of ragged */
  compactBelow?: number;
  className?: string;
}

const NOMINAL = 200;
const LEADING = 0.88;

const CAP = 0.73;

const OUTLINE_WIDTH = 1;

export default function Stencil({
  lines,
  compactBelow = 720,
  className,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const firstLineRef = useRef<SVGTextElement>(null);
  const secondLineRef = useRef<SVGTextElement>(null);

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [firstWidth, setFirstWidth] = useState(
    lines[0].length * NOMINAL * 0.52,
  );
  const [fit, setFit] = useState<string>();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!box.w || !box.h) return;
    let cancelled = false;

    const compact = box.w < compactBelow;

    const layout = () => {
      if (cancelled) return;
      const first = firstLineRef.current;
      const group = groupRef.current;
      if (!first || !group) return;

      const width = first.getComputedTextLength();
      if (width) setFirstWidth(width);

      const secondWidth = secondLineRef.current?.getComputedTextLength() ?? 0;
      const blockWidth = compact
        ? Math.max(width, secondWidth)
        : width || secondWidth;
      const blockHeight = (CAP + LEADING) * NOMINAL;
      if (!blockWidth) return;

      const marginX = box.w * (compact ? 0.04 : 0.05);
      const marginY = box.h * 0.08;
      const scale = Math.min(
        (box.w - marginX * 2) / blockWidth,
        (box.h - marginY * 2) / blockHeight,
      );

      const anchorY = compact ? 0.44 : 0.5;

      const tx = (box.w - blockWidth * scale) / 2;
      const ty =
        (box.h - blockHeight * scale) * anchorY + CAP * NOMINAL * scale;
      setFit(`translate(${tx} ${ty}) scale(${scale})`);
    };

    layout();
    void document.fonts?.ready.then(layout);

    return () => {
      cancelled = true;
    };
  }, [box, lines, firstWidth, compactBelow]);

  const compact = box.w > 0 && box.w < compactBelow;
  const [first, second] = lines;
  const over = { x: -box.w, y: -box.h, width: box.w * 3, height: box.h * 3 };

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
          <g opacity="0">
            <g
              id="ds-wordmark"
              ref={groupRef}
              transform={fit}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: NOMINAL,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              <text
                ref={firstLineRef}
                x={0}
                y={0}
                vectorEffect="non-scaling-stroke"
              >
                {first}
              </text>
              <text
                ref={secondLineRef}
                x={compact ? 0 : firstWidth}
                y={NOMINAL * LEADING}
                textAnchor={compact ? "start" : "end"}
                vectorEffect="non-scaling-stroke"
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

          <use
            href="#ds-wordmark"
            fill="none"
            stroke="var(--color-chalk)"
            strokeWidth={OUTLINE_WIDTH}
          />
        </svg>
      )}
    </div>
  );
}
