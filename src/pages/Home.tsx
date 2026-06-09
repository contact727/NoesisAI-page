import { Hero } from "../components/Hero";
import { ClientLogos } from "../components/ClientLogos";
import { Problem } from "../components/Problem";
import { Solutions } from "../components/Solutions";
import { Expertise } from "../components/Expertise";
import { VoiceAgents } from "../components/VoiceAgents";
import { MissedCallsRoi } from "../components/MissedCallsRoi";
import { Realisations } from "../components/Realisations";
import { Process } from "../components/Process";
import { Team } from "../components/Team";
import { LeadMagnet } from "../components/LeadMagnet";
import { Testimonials } from "../components/Testimonials";
import { ContactForm } from "../components/ContactForm";
import { Faq } from "../components/Faq";
import { FinalCta } from "../components/FinalCta";

export function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Problem />
      <Expertise />
      <Solutions />
      <VoiceAgents />
      <MissedCallsRoi />
      <Realisations />
      <Process />
      <Team />
      <LeadMagnet />
      <Testimonials />
      <ContactForm />
      <Faq />
      <FinalCta />
    </>
  );
}
