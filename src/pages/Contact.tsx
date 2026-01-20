import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingCalendly from '@/components/BookingCalendly';
import ContactItem from '@/components/ContactItem';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact – NOESIS AI</title>
        <meta name="description" content="Parlons de vos automatisations IA. Réponse en 24–48h. Audit gratuit sur demande." />
        <link rel="canonical" href="https://noesisai.fr/contact" />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-contact-title">
                Contactez-nous
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-contact-subtitle">
                Prêt à transformer vos processus ? Commencez par un audit gratuit de vos workflows actuels.
              </p>
            </div>
          </div>
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-info-title">
                      Parlons de votre projet
                    </h2>
                    <p className="text-muted-foreground mb-8" data-testid="text-info-description">
                      Notre équipe d'experts en automatisation IA est là pour vous accompagner dans votre transformation digitale.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ContactItem
                      icon={Mail}
                      label="Email"
                      value="contact@noesisiai.pro"
                      href="mailto:contact@noesisiai.pro"
                      ariaLabel="Envoyer un email à contact@noesisiai.pro"
                    />
                    
                    <ContactItem
                      icon={Phone}
                      label="Téléphone"
                      value="+33 6 89 39 56 23"
                      href="tel:+33689395623"
                      ariaLabel="Appeler le +33 6 89 39 56 23"
                    />
                    
                    <ContactItem
                      icon={Clock}
                      label="Horaires"
                      value="Lun-Ven 9h-18h"
                    />
                    
                    <ContactItem
                      icon={MapPin}
                      label="Localisation"
                      value="Paris, France"
                    />
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">Consultation gratuite</h3>
                      <p className="text-sm text-muted-foreground">
                        Réservez un rendez-vous de 30 minutes pour discuter de vos besoins et identifier les opportunités d'automatisation les plus rentables.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Booking Form */}
              <div className="lg:col-span-2">
                <BookingCalendly
                  title="Prendre un rendez-vous"
                  description="Réservez un créneau de 30 minutes pour discuter de vos besoins en automatisation IA"
                  mode="popup"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}