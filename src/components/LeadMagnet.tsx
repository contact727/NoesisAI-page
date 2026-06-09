import { useState } from "react";
import { Section } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { LEAD_MAGNET, CONTACT_EMAIL } from "../data/content";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Par défaut : ouverture d'un email pré-rempli. À remplacer par votre
    // service de capture (n8n / Formspree / Brevo…) quand il sera prêt.
    const subject = encodeURIComponent("Demande du guide : Les 5 processus à automatiser");
    const body = encodeURIComponent(`Bonjour,\n\nMerci de m'envoyer le guide gratuit.\nEmail : ${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="guide">
      <div className="overflow-hidden rounded-4xl border border-brand-500/30 bg-gradient-to-br from-brand-800/50 via-night-card to-night px-7 py-12 text-white shadow-[0_24px_60px_-24px_rgba(124,58,237,0.5)] sm:px-12 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-400 to-brand-500" />
              {LEAD_MAGNET.badge}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {LEAD_MAGNET.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              {LEAD_MAGNET.subtitle}
            </p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={LEAD_MAGNET.placeholder}
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none sm:max-w-xs"
            />
            <Button type="submit" variant="secondary" size="lg" className="shrink-0">
              {sent ? "Merci !" : LEAD_MAGNET.cta} <Chevrons />
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
