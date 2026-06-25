import { ArrowRight } from "lucide-react";

// Playful Geometric — "Candy Button".
// Hard offset shadow, chunky dark border, pill shape, and a bouncy lift/press.
// Polymorphic: renders an <a> when `href` is given, otherwise a <button>.

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Node shown inside the trailing circle. `null` hides the circle entirely. */
  icon?: React.ReactNode | null;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type PopButtonProps = ButtonProps | AnchorProps;

const base =
  "group inline-flex items-center justify-center rounded-full border-2 border-[var(--pg-fg)] " +
  "font-pg-display font-bold leading-none " +
  "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pg-accent/40 " +
  "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-x-0 disabled:hover:translate-y-0";

const sizes: Record<Size, string> = {
  sm: "gap-2 px-5 py-2 text-sm",
  md: "gap-3 px-6 py-3",
};

const variants: Record<Variant, string> = {
  // Lifts on hover, presses on active — shadow grows/shrinks to match.
  primary:
    "bg-pg-accent text-white shadow-[4px_4px_0_0_var(--pg-fg)] " +
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--pg-fg)] " +
    "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--pg-fg)] " +
    "disabled:shadow-[4px_4px_0_0_var(--pg-fg)]",
  // Outline that fills with yellow on hover.
  secondary:
    "bg-transparent text-pg-fg hover:bg-pg-tertiary " +
    "active:translate-x-0.5 active:translate-y-0.5",
};

export default function PopButton({
  variant = "primary",
  size = "md",
  fullWidth,
  icon,
  className = "",
  children,
  ...rest
}: PopButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  // Default trailing icon (arrow). Pass `icon={null}` to omit, or a custom node.
  const circle = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const trailing =
    icon === null ? null : (
      <span
        className={
          `grid ${circle} shrink-0 place-items-center rounded-full ` +
          (variant === "primary" ? "bg-white text-pg-fg" : "bg-pg-fg text-white")
        }
      >
        {icon ?? <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
      </span>
    );

  const inner = (
    <>
      <span>{children}</span>
      {trailing}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonProps)}>
      {inner}
    </button>
  );
}
