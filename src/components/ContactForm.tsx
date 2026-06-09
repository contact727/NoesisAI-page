import { useState } from "react";
import { Section, SectionHeading } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { CONTACT_EMAIL, ICLOSED_URL } from "../data/content";

const SECTEURS = [
  "Sélectionnez votre secteur (optionnel)",
  "BTP / Bâtiment",
  "Immobilier",
  "Santé / Médical",
  "E-commerce",
  "Services B2B",
  "Industrie",
  "Autre",
];

export function ContactForm() {
  const [form, setForm] = useState({
    prenom: "",
    societe: "",
    secteur: SECTEURS[0],
    telephone: "",
    message: "",
    consent: false,
  });
  const [error, setError] = useState("");

  const update = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.prenom.trim().length < 2) return setError("Le prénom doit contenir au moins 2 caractères.");
    if (!form.consent) return setError("Vous devez accepter d'être contacté par NOESIS AI.");
    setError("");
    // Par défaut : mailto pré-rempli. À remplacer par un webhook n8n / Formspree.
    const subject = encodeURIComponent(`Demande d'audit — ${form.societe || form.prenom}`);
    const body = encodeURIComponent(
      `Prénom : ${form.prenom}\nSociété : ${form.societe}\nSecteur : ${form.secteur}\nTéléphone : ${form.telephone}\n\nMessage :\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-500/60 focus:bg-white/10 focus:outline-none";

  return (
    <Section id="contact">
      <SectionHeading
        badge="Contactez-nous"
        title="Réservez votre audit gratuit"
        subtitle="Réservez directement un créneau, ou laissez-nous vos coordonnées et nous vous recontactons."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
        {/* Bloc prise de RDV iClosed */}
        <div className="flex flex-col justify-between rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-800/40 via-night-card to-night p-8 text-white shadow-[0_24px_60px_-24px_rgba(124,58,237,0.5)]">
          <div>
            <h3 className="text-2xl font-bold">Prendre rendez-vous en un clic</h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Choisissez un créneau de 30 minutes qui vous convient. On analyse ensemble vos workflows
              et on identifie vos automatisations les plus rentables.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-white/80">
              <li className="flex items-center gap-2"><span className="text-white/40">→</span> Audit offert, sans engagement</li>
              <li className="flex items-center gap-2"><span className="text-white/40">→</span> Roadmap et ROI estimé</li>
              <li className="flex items-center gap-2"><span className="text-white/40">→</span> Réponse à toutes vos questions</li>
            </ul>
          </div>
          <Button href={ICLOSED_URL} external variant="secondary" size="lg" className="mt-8 w-full">
            Réserver mon créneau <Chevrons />
          </Button>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={submit}
          className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-night-card p-7 sm:p-8"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={field}
              placeholder="Prénom *"
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              required
            />
            <input
              className={field}
              placeholder="Nom de votre société"
              value={form.societe}
              onChange={(e) => update("societe", e.target.value)}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className={field}
              value={form.secteur}
              onChange={(e) => update("secteur", e.target.value)}
            >
              {SECTEURS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              className={field}
              placeholder="Téléphone"
              type="tel"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />
          </div>
          <textarea
            className={field}
            placeholder="Décrivez brièvement vos besoins ou questions (optionnel)"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-ink-950"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            J'accepte d'être contacté par NOESIS AI concernant ma demande. Mes données sont traitées
            conformément à la politique de confidentialité (RGPD).
          </label>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <Button type="submit" size="lg" className="mt-1 w-full">
            Demander mon audit gratuit <Chevrons />
          </Button>
        </form>
      </div>
    </Section>
  );
}
