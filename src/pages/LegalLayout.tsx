import { Link } from "react-router-dom";

/** Mise en page commune aux pages légales (lecture confortable). */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="pt-32 pb-20">
      <div className="container-page max-w-3xl">
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white">
          ← Retour à l'accueil
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : {updated}</p>}
        <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-slate-300">
          {children}
        </div>
      </div>
    </main>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-bold text-white">{heading}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}
