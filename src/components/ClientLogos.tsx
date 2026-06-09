import { Marquee } from "./ui/Marquee";
import { CLIENT_LOGOS, TRUST_TITLE } from "../data/content";

/** Logo en blanc monochrome, sans cadre, sur le fond sombre. */
function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex h-20 w-44 items-center justify-center px-6 sm:h-24 sm:w-52">
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="max-h-10 max-w-full object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  );
}

export function ClientLogos() {
  return (
    <section id="clients" className="scroll-mt-24 border-y border-white/10 bg-white/[0.02] py-14">
      <div className="container-page">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
          {TRUST_TITLE}
        </p>
      </div>
      <Marquee>
        {CLIENT_LOGOS.map((logo) => (
          <LogoCard key={logo.name} {...logo} />
        ))}
      </Marquee>
    </section>
  );
}
