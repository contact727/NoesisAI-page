import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueBlocks from '@/components/ValueBlocks';
import HowWeWork from '@/components/HowWeWork';
import CaseStudies from '@/components/CaseStudies';
import StackTools from '@/components/StackTools';
import Testimonials from '@/components/Testimonials';
import LeadMagnet from '@/components/LeadMagnet';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ValueBlocks />
        <HowWeWork />
        <CaseStudies />
        <StackTools />
        <Testimonials />
        <LeadMagnet />
      </main>
      <Footer />
    </div>
  );
}