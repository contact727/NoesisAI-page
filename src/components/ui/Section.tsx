import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { cn } from "./cn";

/** Conteneur de section avec id d'ancre + padding vertical homogène. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** En-tête de section centré : badge pilule + titre display + sous-titre. */
export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <h2 className="text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

/** Wrapper d'apparition au scroll, réutilisable. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
