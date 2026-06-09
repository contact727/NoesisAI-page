import { Link } from "react-router-dom";
import { FOOTER, SOCIALS } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base/60">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logos/noesis-mark.png" alt="NOESIS.AI" className="h-9 w-9" />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                NOESIS<span className="text-gradient">.AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{FOOTER.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                aria-label="Instagram"
              >
                ig
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{FOOTER.navTitle}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{FOOTER.legalTitle}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER.legal.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NOESIS AI — Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500">Automatisations IA · n8n · Make · agents vocaux</p>
        </div>
      </div>
    </footer>
  );
}
