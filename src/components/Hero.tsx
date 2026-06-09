import { motion } from "framer-motion";
import { Button, Chevrons } from "./ui/Button";
import { HERO, ICLOSED_URL } from "../data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Halo de fond léger */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 z-0 mx-auto h-[480px] max-w-4xl rounded-full bg-gradient-to-r from-[#3b82f6]/20 via-[#8b5cf6]/15 to-[#c026d3]/20 blur-3xl"
      />
      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            {HERO.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Des systèmes d'IA sur-mesure{" "}
            <span className="text-gradient">qui transforment votre entreprise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={ICLOSED_URL} external size="lg">
              {HERO.primaryCta} <Chevrons />
            </Button>
            <Button href="#realisations" variant="secondary" size="lg">
              {HERO.secondaryCta}
            </Button>
          </motion.div>

          {/* Stats / preuve sociale */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-12 grid w-full max-w-xl grid-cols-3 divide-x divide-white/10 rounded-3xl border border-white/10 bg-white/5 py-5 shadow-card backdrop-blur"
          >
            {HERO.stats.map((s) => (
              <div key={s.label} className="px-2">
                <div className="text-lg font-extrabold text-white sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-[0.7rem] leading-tight text-slate-400 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
