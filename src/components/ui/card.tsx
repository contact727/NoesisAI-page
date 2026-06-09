import { cn } from "./cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-night-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-night-700 sm:p-7",
        className
      )}
    >
      {children}
    </div>
  );
}
