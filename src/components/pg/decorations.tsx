// Playful Geometric — decorative primitives.
// All purely ornamental: aria-hidden + pointer-events-none, and hidden on
// small screens (per the design system's responsive rule) so floating shapes
// never overlap text on mobile.

type SVGProps = React.SVGProps<SVGSVGElement>;

/** Hand-drawn underline squiggle — sits under emphasized words. */
export function Squiggle({ className, ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M2 8C25 2 40 2 62 8s37 6 60 0 50-6 76 0"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small filled circle / dot. */
function Dot({ className, ...props }: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  );
}

/** A hollow ring. */
function Ring({ className, ...props }: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={4} />
    </svg>
  );
}

/** A rounded triangle. */
function Triangle({ className, ...props }: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
      <path
        d="M12 3 22 20H2L12 3Z"
        fill="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
      />
    </svg>
  );
}

/** A chunky plus / cross. */
function Plus({ className, ...props }: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Shapes = { Dot, Ring, Triangle, Plus };

/**
 * A scattered "confetti" field of primitive shapes. Absolutely positioned,
 * so the parent must be `relative`. Decorative only — hidden on mobile.
 */
export function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      <Dot className="absolute left-[6%] top-[18%] h-4 w-4 text-pg-tertiary" />
      <Ring className="absolute right-[8%] top-[12%] h-9 w-9 text-pg-secondary" />
      <Triangle className="absolute left-[12%] bottom-[16%] h-7 w-7 rotate-12 text-pg-quaternary" />
      <Plus className="absolute right-[14%] bottom-[22%] h-6 w-6 text-pg-accent" />
      <Dot className="absolute right-[28%] top-[8%] h-3 w-3 text-pg-accent" />
      <Ring className="absolute left-[22%] top-[6%] h-5 w-5 text-pg-tertiary" />
    </div>
  );
}
