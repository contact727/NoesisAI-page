import { useEffect, useState } from "react";
import { Button, Chevrons } from "./ui/Button";
import { cn } from "./ui/cn";
import { ICLOSED_URL, NAV_LINKS } from "../data/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page">
        <nav
          className={cn(
            "mt-3 flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-white/10 bg-base/70 shadow-card backdrop-blur-md"
              : "border-white/5 bg-white/5 backdrop-blur-sm"
          )}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/logos/noesis-mark.png" alt="NOESIS.AI" className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              NOESIS<span className="text-gradient">.AI</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={ICLOSED_URL} external size="md" className="hidden sm:inline-flex">
              Audit gratuit <Chevrons />
            </Button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            >
              <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        {open && (
          <div className="mt-2 rounded-3xl border border-white/10 bg-base/95 p-3 shadow-card backdrop-blur-md lg:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={ICLOSED_URL} external className="mt-2 w-full">
              Réserver un audit gratuit <Chevrons />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
