import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>FAQ – NOESIS AI</title>
        <meta name="description" content="Réponses aux questions sur l'automatisation IA, les intégrations (n8n/Make), la sécurité et les délais." />
        <link rel="canonical" href="https://noesisai.fr/faq" />
      </Helmet>
      
      <Header />
      
      <main>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Questions fréquentes
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Toutes les réponses aux questions sur l'automatisation IA et nos services.
              </p>
            </div>
            <FAQ />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}