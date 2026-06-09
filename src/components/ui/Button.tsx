import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.55)] hover:shadow-[0_14px_32px_-10px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "bg-white/5 text-white border border-white/15 hover:border-white/30 hover:bg-white/10 backdrop-blur hover:-translate-y-0.5",
  ghost: "text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

/** Petit chevron animé « ›› » à la Clicknland. */
export function Chevrons() {
  return <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">››</span>;
}
