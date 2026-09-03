import { cn } from "@/lib/utils";

interface WaxSealProps {
  /** Stable per-quote variation, so no two seals are pressed identically. */
  seed?: string;
  size?: number;
  className?: string;
}

/**
 * A pressed wax seal.
 *
 * Built the way the real thing is made: a lump of wax spreads into an
 * irregular disc, the die presses a flat face into the middle, and the wax
 * it displaces rolls up into a rounded rim. So the drawing has two levels —
 * a raised rim and a sunken face — and the light has to fall across both.
 */
export function WaxSeal({ seed = "", size = 84, className }: WaxSealProps) {
  const id = hash(seed);
  const uid = `seal-${id}`;
  const rotate = -12 + (id % 25);

  return (
    <span
      className={cn("inline-block shrink-0 select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="-12 -12 124 124" width="100%" height="100%">
        <defs>
          {/* the rim: bright where the light hits, deep on the far side */}
          <linearGradient id={`${uid}-rim`} x1="20%" y1="6%" x2="80%" y2="94%">
            <stop offset="0%" stopColor="#3fb3a9" />
            <stop offset="34%" stopColor="#158b83" />
            <stop offset="70%" stopColor="#0e6b65" />
            <stop offset="100%" stopColor="#083f3c" />
          </linearGradient>

          {/* the face sits lower, so it reads cooler and flatter */}
          <radialGradient id={`${uid}-face`} cx="36%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#12857e" />
            <stop offset="52%" stopColor="#0d6d67" />
            <stop offset="100%" stopColor="#08514d" />
          </radialGradient>

          {/* contact shadow: the seal is stuck to the paper, not floating */}
          <filter id={`${uid}-cast`} x="-45%" y="-45%" width="190%" height="190%">
            <feDropShadow
              dx="0.5"
              dy="2.4"
              stdDeviation="2.4"
              floodColor="#052e2c"
              floodOpacity="0.3"
            />
          </filter>

          {/* the rim stands above the face, so it shades the near wall */}
          <filter id={`${uid}-inner`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="-1.2"
              dy="-1.8"
              stdDeviation="2.4"
              floodColor="#042523"
              floodOpacity="0.65"
            />
          </filter>

          <filter id={`${uid}-soft`}>
            <feGaussianBlur stdDeviation="1.6" />
          </filter>

          {/* wax is grainy under a raking light */}
          <filter id={`${uid}-grain`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4"
              numOctaves="3"
              seed={id % 89}
              result="n"
            />
            <feColorMatrix in="n" type="saturate" values="0" />
          </filter>

          <linearGradient id={`${uid}-sheen`} x1="22%" y1="10%" x2="76%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#032220" stopOpacity="0.26" />
          </linearGradient>

          <clipPath id={`${uid}-clipOuter`}>
            <path d={SEAL_BLOB} />
          </clipPath>
          <clipPath id={`${uid}-clipFace`}>
            <path d={SEAL_FACE} />
          </clipPath>
        </defs>

        <g transform={`rotate(${rotate} 50 50)`}>
          {/* the wax that spread out under the press */}
          <g filter={`url(#${uid}-cast)`}>
            <path d={SEAL_BLOB} fill={`url(#${uid}-rim)`} />
          </g>

          <g clipPath={`url(#${uid}-clipOuter)`}>
            {/* the lit crest of the rim, upper left */}
            <path
              d={SEAL_BLOB}
              fill="none"
              stroke="#63cdc4"
              strokeWidth="3"
              opacity="0.55"
              filter={`url(#${uid}-soft)`}
              transform="translate(-1.4 -1.8)"
            />
            {/* and its dark underside, lower right */}
            <path
              d={SEAL_BLOB}
              fill="none"
              stroke="#052f2d"
              strokeWidth="5"
              opacity="0.6"
              filter={`url(#${uid}-soft)`}
              transform="translate(1.8 2.2)"
            />
            {/* the wax darkens all the way round where it thins out */}
            <path
              d={SEAL_BLOB}
              fill="none"
              stroke="#07403d"
              strokeWidth="6"
              opacity="0.35"
              filter={`url(#${uid}-soft)`}
            />
          </g>

          {/* the face the die pressed: lower than the rim, so it takes a shadow */}
          <g filter={`url(#${uid}-inner)`}>
            <path d={SEAL_FACE} fill={`url(#${uid}-face)`} />
          </g>

          <g clipPath={`url(#${uid}-clipFace)`}>
            {/* the far wall of the depression catches the light */}
            <path
              d={SEAL_FACE}
              fill="none"
              stroke="#7ddbd2"
              strokeWidth="2.4"
              opacity="0.4"
              filter={`url(#${uid}-soft)`}
              transform="translate(1.2 1.8)"
            />

            {/* engraved ring — a cut, and the lip the cut raises */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#063735"
              strokeWidth="2.4"
              opacity="0.75"
            />
            <circle
              cx="50"
              cy="51.4"
              r="30"
              fill="none"
              stroke="#6fd4cb"
              strokeWidth="1.2"
              opacity="0.35"
            />

            {/* the two pins on the die */}
            <circle cx="18.5" cy="47" r="1.7" fill="#063735" opacity="0.6" />
            <circle cx="81.5" cy="47" r="1.7" fill="#063735" opacity="0.6" />

            {/* the mark: the site's triangle, struck solid like the favicon */}
            <path
              d={SEAL_MARK}
              fill="#8fe4dc"
              opacity="0.55"
              transform="translate(1.4 2)"
            />
            <path
              d={SEAL_MARK}
              fill="#03211f"
              opacity="0.85"
              transform="translate(-1.2 -1.6)"
            />
            <path d={SEAL_MARK} fill="#0d716b" />

            {/* light across the whole face */}
            <path d={SEAL_FACE} fill={`url(#${uid}-sheen)`} />
            <rect
              x="-12"
              y="-12"
              width="124"
              height="124"
              filter={`url(#${uid}-grain)`}
              opacity="0.1"
              style={{ mixBlendMode: "overlay" }}
            />
          </g>
        </g>
      </svg>
    </span>
  );
}

/** The spread wax. Twelve lobes, none of them the same radius. */
export const SEAL_BLOB =
  "M50.00 3.50 C58.16 3.50 65.38 7.84 72.10 11.72 C78.82 15.60 87.20 18.83 91.40 26.10 C95.59 33.37 95.00 42.10 95.00 50.00 C95.00 57.90 91.59 65.17 87.76 71.80 C83.93 78.43 80.51 86.42 73.40 90.53 C66.29 94.64 57.79 94.40 50.00 94.40 C42.21 94.40 33.47 95.31 26.25 91.14 C19.03 86.97 14.82 79.47 10.86 72.60 C6.89 65.73 6.20 57.69 6.20 50.00 C6.20 42.31 5.17 33.64 9.30 26.50 C13.42 19.36 20.27 14.51 27.20 10.51 C34.13 6.51 41.84 3.50 50.00 3.50 Z";

/** The face the die pressed, inside the rim. */
export const SEAL_FACE =
  "M50.00 10.71 C56.90 10.71 63.00 14.38 68.67 17.65 C74.35 20.93 81.43 23.66 84.98 29.80 C88.52 35.94 88.03 43.33 88.03 50.00 C88.03 56.67 85.14 62.82 81.91 68.42 C78.67 74.02 75.78 80.78 69.77 84.25 C63.76 87.72 56.59 87.52 50.00 87.52 C43.41 87.52 36.03 88.28 29.93 84.76 C23.83 81.24 20.28 74.90 16.92 69.10 C13.57 63.29 12.99 56.50 12.99 50.00 C12.99 43.50 12.12 36.18 15.61 30.14 C19.09 24.11 24.88 20.01 30.73 16.63 C36.59 13.25 43.10 10.71 50.00 10.71 Z";

/** The site's triangle, solid, at the scale a die would cut it. */
export const SEAL_MARK = "M50 35.5 65.5 62.5 H34.5 Z";

function hash(value: string): number {
  let out = 7;
  for (let i = 0; i < value.length; i += 1) {
    out = (out * 31 + value.charCodeAt(i)) % 9973;
  }
  return out;
}
