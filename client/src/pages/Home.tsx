import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBlocks from '@/components/ValueBlocks';
import CaseStudies from '@/components/CaseStudies';
import LeadMagnet from '@/components/LeadMagnet';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ValueBlocks />
        <CaseStudies />
        <FAQ />
        <LeadMagnet />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}