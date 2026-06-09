import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { TEAM } from "../data/content";

export function Team() {
  return (
    <section id="equipe" className="scroll-mt-24 bg-night py-20 text-white sm:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <Badge className="border-white/15 bg-white/5 text-white/70">{TEAM.badge}</Badge>
          <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-[2.75rem]">
            {TEAM.title}
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">{TEAM.subtitle}</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {TEAM.members.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-3xl border border-white/10 bg-night-card p-8 text-center"
            >
              <div className="rounded-full bg-brand-gradient p-[3px]">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-bold">{m.name}</h3>
              <p className="mt-1 text-sm text-white/50">{m.role}</p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <span className="font-bold">in</span> Voir le profil LinkedIn
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
