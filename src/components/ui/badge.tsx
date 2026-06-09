import { cn } from "./cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {children}
    </span>
  );
}
